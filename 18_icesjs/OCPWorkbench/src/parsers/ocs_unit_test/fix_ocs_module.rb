js_file = '../ocs.js'
content = IO.read(js_file).sub('module.exports =', 'export default')
IO.write(js_file, content)
