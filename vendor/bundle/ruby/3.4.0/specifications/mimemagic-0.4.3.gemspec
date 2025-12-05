# -*- encoding: utf-8 -*-
# stub: mimemagic 0.4.3 ruby lib
# stub: ext/mimemagic/Rakefile

Gem::Specification.new do |s|
  s.name = "mimemagic".freeze
  s.version = "0.4.3".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/mimemagicrb/mimemagic/issues", "changelog_uri" => "https://github.com/mimemagicrb/mimemagic/blob/master/CHANGELOG.md", "source_code_uri" => "https://github.com/mimemagicrb/mimemagic" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Daniel Mendler".freeze, "Jon Wood".freeze]
  s.date = "2021-03-26"
  s.description = "Fast mime detection by extension or content (Uses freedesktop.org.xml shared-mime-info database)".freeze
  s.email = ["mail@daniel-mendler.de".freeze, "jon@blankpad.net".freeze]
  s.extensions = ["ext/mimemagic/Rakefile".freeze]
  s.files = ["ext/mimemagic/Rakefile".freeze]
  s.homepage = "https://github.com/mimemagicrb/mimemagic".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.2.3".freeze
  s.summary = "Fast mime detection by extension or content".freeze

  s.installed_by_version = "3.7.2".freeze

  s.specification_version = 4

  s.add_runtime_dependency(%q<nokogiri>.freeze, ["~> 1".freeze])
  s.add_runtime_dependency(%q<rake>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<minitest>.freeze, ["~> 5.14".freeze])
end
