module.exports = {
    plugins:[
        require('postcss-cssnext')(),
        require('autoprefixer')(),
        require('cssnano')()
    ]
}