js_file = '../ocs-parser.js'
content = IO.read(js_file).sub('module.exports =', 'export default')
IO.write(js_file, content)
