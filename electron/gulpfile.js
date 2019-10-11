const
	gulpPugClient = require(`gulp-pug-client`),
	gulpPug = require(`gulp-pug`),
	gulpBabel = require(`gulp-babel`),
	{
		src,
		dest,
		series,
		parallel,
		watch,
	} = require(`gulp`),
	path = require(`path`),
	{Transform} = require(`stream`),
	input = `src/`,
	output = `dist/`,
	copyGlobs = [
		`**/*.js`,
		`**/*.css`,
		`**/*.json`,
		`**/*.png`,
	].map(g => input + g)
		.concat([`!${input}win/modules/**/*.js`]);

function copy() {
	return src(copyGlobs)
		.pipe(dest(output));
}

function pugClient() {
	return src(input + `win/pug-client/*.pug`)
		.pipe(gulpPugClient())
		.pipe(dest(output + `win/pug-client`));
}

function pug() {
	return src(input + `win/*.pug`)
		.pipe(gulpPug())
		.pipe(dest(output + `win`));
}

function babel() {
	return src(input + `win/modules/**/*.js`)
		.pipe(gulpBabel({plugins: [`@babel/plugin-transform-modules-commonjs`]}))
		.pipe(dest(output + `win/modules`));
}

exports.default = parallel(copy, pug, pugClient, babel);
watch(copyGlobs, copy);
watch(input + `win/*.pug`, pug);
watch(input + `win/pug-client/*.pug`, pugClient);
watch(input + `win/modules/**/*.js`, babel);
