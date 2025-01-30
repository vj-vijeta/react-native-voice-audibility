import Foundation
import AVFoundation

@objc(VoiceAudibility)
class VoiceAudibility: RCTEventEmitter {
  
  private var audioEngine: AVAudioEngine?
  private var isRecording = false

  override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  // Define which events we can emit to JS
  override func supportedEvents() -> [String]! {
    return ["onAudioData"]
  }

  @objc
  func startRecording(_ options: NSDictionary,
                      resolver resolve: RCTPromiseResolveBlock,
                      rejecter reject: RCTPromiseRejectBlock) {
    guard !isRecording else {
      reject("E_ALREADY_RECORDING", "Already recording", nil)
      return
    }

    audioEngine = AVAudioEngine()
    guard let audioEngine = audioEngine else {
      reject("E_AUDIO_ENGINE", "Cannot create AVAudioEngine", nil)
      return
    }

    let inputNode = audioEngine.inputNode
    let recordingFormat = inputNode.outputFormat(forBus: 0)

    // Sensitivity factor from JS
    let sensitivity = options["sensitivity"] as? Double ?? 1.0

    // Install tap to read audio data
    inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) {
      (buffer, when) in
      guard let channelData = buffer.floatChannelData?[0] else { return }
      let frameLength = Int(buffer.frameLength)

      // Compute RMS amplitude from float samples
      var sum: Float = 0.0
      for i in 0..<frameLength {
        sum += channelData[i] * channelData[i]
      }
      let mean = sum / Float(frameLength)
      let rms = sqrtf(mean)  // 0..1 typically
      let amplitude = Double(rms) * sensitivity

      self.sendEvent(withName: "onAudioData", body: amplitude)
    }

    do {
      try AVAudioSession.sharedInstance().setCategory(.playAndRecord, options: [.defaultToSpeaker, .allowBluetooth])
      try AVAudioSession.sharedInstance().setActive(true)
      audioEngine.prepare()
      try audioEngine.start()
      isRecording = true
      resolve(true)
    } catch {
      reject("E_AUDIO_ENGINE", "Could not start audio engine", error)
    }
  }

  @objc
  func stopRecording(_ resolve: RCTPromiseResolveBlock,
                     rejecter reject: RCTPromiseRejectBlock) {
    guard isRecording else {
      reject("E_NOT_RECORDING", "Not currently recording", nil)
      return
    }
    audioEngine?.stop()
    audioEngine?.inputNode.removeTap(onBus: 0)
    audioEngine = nil
    isRecording = false

    do {
      try AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    } catch {
      // Not critical; can ignore or handle
    }

    resolve(true)
  }
}