const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
module.exports = {
    mode:'development',
	entry: path.join(__dirname, "React", "expose-components.js"),
	output: {
		path: path.resolve(__dirname, "wwwroot/dist"),
		publicPath: '/dist/',
		globalObject: 'this'
	},
    module: {
        rules: [
            {
                test: /\.?js|.?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: [
							[
								'@babel/plugin-transform-modules-commonjs',
								{
									loose: true,
									strictMode: false,
								},
							],
						]
                    }
                }
			},
			{
				test: /\.(t|j)sx?$/,
				enforce: 'post',
				use: [{ loader: path.resolve('./stripStrictLoader.js') }],
			}

        ]
    },
	plugins: [
		new WebpackManifestPlugin({
			fileName: 'asset-manifest.json',
			generate: (seed, files) => {
				const manifestFiles = files.reduce((manifest, file) => {
					manifest[file.name] = file.path;
					return manifest;
				}, seed);

				const entrypointFiles = files.filter(x => x.isInitial && !x.name.endsWith('.map')).map(x => x.path);

				return {
					files: manifestFiles,
					entrypoints: entrypointFiles,
				};
			},
		})
	]
}