Welcome to Random Person Generator
=================

When testing and/or working with various projects, I get hung up on making up random user names way more than I should. 
This app generates a random first name, last name, and gender using random names. I will add more data as required. 
Node.js service that renders pages using Pug templates.
Since this is live updating, I'm pretty sure versioning is a pointless exercise, but I'll try to work with it for now until
I either figure out how to manage versions, or I realize that I can't manage versions. 


Made on [Glitch](https://glitch.com/)
-------------------
## Deployed at [Random Person Generator!](https://gilded-wing.glitch.me/)

\ ゜o゜)ノ

 # Changelog
 All notable changes will be documented in this file...unless I forget...
 
 The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
 and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 
 ## [0.2.0] - 2019.08.17
 ### Added
 - email address
   - name generated from a set of prefix/suffix/interfix values randomly combined.
   - server name pulled from a list of stored names.
   - domain pulled from a list of stored values.
 - SSN
   - numbers randomly generated, and combined in the correct pattern
 
 ## [0.1.0] - 2019.08.14
 ### Added Create route /randomPerson
 - returns json string containing random first name, last name, and gender, and formats
 in a readable format when rendered in the browser.
 
 ## [0.0.1] - 2019.08.14
 ### Added
 - Render a random first name, last name, and gender