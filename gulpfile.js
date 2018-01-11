const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-clean-css');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const fs = require('fs-extra');
const config = require('./src/components/vant/style/scripts/icon-config');
const path = require('path');
const shelljs = require('shelljs');
const md5File = require('md5-file');

function extractSvg() {
  shelljs.exec('./scripts/extract-icons.sh');
  fs.mkdirsSync(path.join(__dirname, './src/components/vant/style/icons'));
  config.glyphs.forEach(icon => {
    const src = path.join(__dirname, './src/components/vant/style/icons/', icon.src);
    if (fs.existsSync(src)) {
      fs.renameSync(src, path.join(__dirname, './src/components/vant/style/icons', icon.css + '.svg'));
    }
  });
}

function getCodePoints() {
  const codePoints = {};
  config.glyphs.forEach((icon, index) => {
    const svgPath = path.join(__dirname, './src/components/vant/style/icons/', icon.css + '.svg');
    if (fs.existsSync(svgPath)) {
      codePoints[icon.css] = 0xe800 + index;
    }
  });
}

gulp.task('compile', () => {
  return gulp
    .src('./src/components/vant/style/src/*.css')
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(gulp.dest('./src/components/vant/style/lib'));
});

gulp.task('icon-font-ttf', () => {
  extractSvg();
  return gulp
    .src(['./src/components/vant/style/icons/*.svg'])
    .pipe(
      iconfontCss({
        fontName: config.name,
        path: './src/components/vant/style/scripts/icon-template.css',
        targetPath: './src/components/vant/style/icon.css',
        normalize: true,
        firstGlyph: 0xe800,
        fixedCodepoints: getCodePoints()
      })
    )
    .pipe(
      iconfont({
        fontName: config.name,
        formats: ['ttf']
      })
    )
    .on('glyphs', (glyphs, options) => {})
    .pipe(gulp.dest('./src/components/vant/style/icons'));
});

gulp.task('icon-font', ['icon-font-ttf'], () => {
  const fontPath = path.resolve(__dirname, './src/components/vant/style/icons/vant-icon.ttf');
  const hash = md5File.sync(fontPath).slice(0, 8);
  fs.renameSync(fontPath, path.resolve(__dirname, `./src/components/vant/style/icons/vant-icon-${hash}.ttf`));

  let source = fs.readFileSync(path.resolve(__dirname, './src/components/vant/style/icons/icon.css'), 'utf-8');
  source = source.replace('vant-icon.ttf', `vant-icon-${hash}.ttf`);

  fs.writeFileSync(path.resolve(__dirname, './src/components/vant/style/src/icon.css'), source);
  shelljs.exec(`superman cdn /zanui/icon ./icons/vant-icon-${hash}.ttf`);
});

gulp.task('build', ['compile']);
