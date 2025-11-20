# -*- encoding: utf-8 -*-
# stub: jekyll-avatar 0.7.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-avatar".freeze
  s.version = "0.7.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Ben Balter".freeze]
  s.date = "2019-08-12"
  s.email = ["ben.balter@github.com".freeze]
  s.homepage = "https://github.com/benbalter/jekyll-avatar".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.0.4".freeze
  s.summary = "A Jekyll plugin for rendering GitHub avatars".freeze

  s.installed_by_version = "3.7.2".freeze

  s.specification_version = 4

  s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3.0".freeze, "< 5.0".freeze])
  s.add_development_dependency(%q<bundler>.freeze, ["> 1.0".freeze, "< 3.0".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 12.3".freeze])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0".freeze])
  s.add_development_dependency(%q<rspec-html-matchers>.freeze, ["~> 0.9".freeze])
  s.add_development_dependency(%q<rubocop-jekyll>.freeze, ["~> 0.10.0".freeze])
end
