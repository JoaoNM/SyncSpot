const path = require("path");
const withTM = require("next-transpile-modules")([]);

const nextConfig = withTM({
	reactStrictMode: true,
	webpack(config) {
		config.resolve.alias["@"] = path.resolve(__dirname);
		return config;
	},
});

module.exports = nextConfig;
