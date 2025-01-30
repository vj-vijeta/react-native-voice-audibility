package com.reactnativevoiceaudibility

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.media.AudioFormat
import android.media.AudioRecord
import android.media.MediaRecorder
import kotlin.concurrent.thread

class VoiceAudibilityModule(private val reactContext: ReactApplicationContext)
  : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "VoiceAudibility"
  }

  private var isRecording = false
  private var audioRecord: AudioRecord? = null
  private var recordingThread: Thread? = null

  /**
   * Starts recording and analyzes _amplitude in real-time.
   * Options can include a sensitivity factor.
   */
  @ReactMethod
  fun startRecording(options: ReadableMap, promise: Promise) {
    if (isRecording) {
      promise.reject("E_ALREADY_RECORDING", "Recording is already in progress.")
      return
    }

    val sampleRate = 44100
    val bufferSize = AudioRecord.getMinBufferSize(
      sampleRate,
      AudioFormat.CHANNEL_IN_MONO,
      AudioFormat.ENCODING_PCM_16BIT
    )
    if (bufferSize == AudioRecord.ERROR || bufferSize == AudioRecord.ERROR_BAD_VALUE) {
      promise.reject("E_BUFFER_ERROR", "Invalid buffer size.")
      return
    }

    val sensitivity = if (options.hasKey("sensitivity")) {
      options.getDouble("sensitivity")
    } else {
      1.0
    }

    audioRecord = AudioRecord(
      MediaRecorder.AudioSource.MIC,
      sampleRate,
      AudioFormat.CHANNEL_IN_MONO,
      AudioFormat.ENCODING_PCM_16BIT,
      bufferSize
    )

    if (audioRecord?.state != AudioRecord.STATE_INITIALIZED) {
      promise.reject("E_RECORD_ERROR", "AudioRecord not initialized.")
      return
    }

    isRecording = true
    audioRecord?.startRecording()

    // Real-time read loop
    recordingThread = thread(start = true) {
      val audioBuffer = ShortArray(bufferSize)
      while (isRecording) {
        val readCount = audioRecord?.read(audioBuffer, 0, bufferSize) ?: 0
        if (readCount > 0) {
          val _amplitude = calculateRMS(audioBuffer, readCount) * sensitivity
          // Emit _amplitude event
          sendEvent("onAudioData", _amplitude)
        }
      }
    }

    promise.resolve(true)
  }

  @ReactMethod
  fun stopRecording(promise: Promise) {
    if (!isRecording) {
      promise.reject("E_NOT_RECORDING", "No recording in progress.")
      return
    }
    isRecording = false

    audioRecord?.stop()
    audioRecord?.release()
    audioRecord = null

    recordingThread?.interrupt()
    recordingThread = null

    promise.resolve(true)
  }

  private fun calculateRMS(buffer: ShortArray, readCount: Int): Double {
    var sum = 0.0
    for (i in 0 until readCount) {
      sum += (buffer[i] * buffer[i]).toDouble()
    }
    val mean = sum / readCount
    return Math.sqrt(mean)
  }

  private fun sendEvent(eventName: String, _amplitude: Double) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, _amplitude)
  }
}