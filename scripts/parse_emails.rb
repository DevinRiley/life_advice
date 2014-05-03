#!usr/bin/env ruby

require 'csv'
messages, addresses, subjects = [], [], []
email_regex = /(\S+)@(\S+)/
f = CSV.read('index.csv')
f.each do |row|
  subjects.push(row[0])
  addresses.push(row[1])
  messages.push(row[5])
end

messages.each do |email| 
  #strips out header info from message body
  email.slice!(0...email.index(/listserv.devin.riley@gmail.com/) + 31)
  #strip out any email addresses
  email.gsub!(email_regex, '')
  #substitute name
  email.gsub!(/devin/i, '{{ name }}')
end

CSV.open('index_cleaned.csv', 'wb') do |csv| 
  csv << ["Subject", "Sender", "Message"] # Headers
  messages.each_with_index do |message, i|
    csv << [subjects[i], addresses[i], messages[i]] 
  end
end
