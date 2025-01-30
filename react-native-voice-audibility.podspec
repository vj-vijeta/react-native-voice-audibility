require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "react-native-voice-audibility"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  # Minimum iOS version you want to support
  s.platforms    = { :ios => "12.0" }

  # The Git URL and tag should match your GitHub repo & version
  s.source       = {
    :git => "https://github.com/vj-vijeta/react-native-voice-audibility.git",
    :tag => "#{s.version}"
  }

  # List of files to include for CocoaPods to build
  s.source_files = "ios/**/*.{h,m,mm,swift}"

  # If RN >= 0.71, there's a helper for new arch
  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    # Dependencies for old architecture
    s.dependency "React-Core"

    # If user has enabled new architecture in the app
    if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
      s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
      s.pod_target_xcconfig = {
        "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
        "OTHER_CPLUSPLUSFLAGS" => folly_compiler_flags,
        "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
      }

      # Dependencies for new architecture
      s.dependency "React-Codegen"
      s.dependency "RCT-Folly"
      s.dependency "RCTRequired"
      s.dependency "RCTTypeSafety"
      s.dependency "ReactCommon/turbomodule/core"
    end
  end
end