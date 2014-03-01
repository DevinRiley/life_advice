require 'csv'
require 'json'


# read info into an array
data = [];
csv_text = File.read('emails.csv')
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  data.push(row.to_hash)
end

# more data fixing

final = []
data.each_with_index do |email, i|

  email.delete('sender')

  if email['tags']
    email['tags'] = email['tags'].split(',')
  end

  if email['message']
    email['message'].gsub!("\n", '<br>')
  end

  email['position'] = i
  email['open'] = false
  if email['cleaned']
    email['cleaned'] = true
    final << email
  end
end


jsonFile = File.open("emails.json", 'w')
jsonFile.write(JSON.pretty_generate(final))