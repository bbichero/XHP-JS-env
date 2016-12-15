# HACK, XHP-JS, REACT basic environment

- HHVM : 3.15.3     (Compile HACK code)
- XHP-LIB : 2.3.2   (Add xml feature)
- XHP-JS : 1.0.0    (XHP-LIB send data to REACT-JS)
- REACT-JS : 15.4.1 (View creator)
- AXIOS : 0.15.3    (AJAX-like lib)

# Installation from scratch (Linux)

## HHVM

```
sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0x5a16e7281be7a449
echo deb http://dl.hhvm.com/debian jessie main | sudo tee /etc/apt/sources.list.d/hhvm.list
sudo apt-get update
sudo apt-get install hhvm
```
## Node.JS and NPM

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```
## Composer

```
wget https://getcomposer.org/composer.phar
hhvm composer.phar install
```
## Install and update all dependencies

Copy and past composer.json and package.json in your root directory

```
hhvm composer.phar update
npm update
```

## Compile JSX code (Each times you modify ReactJS code)

```
npm run build:All
```

# Your root tree

![alt tag](http://xhpjs.bbichero.com/root_tree_xhpjs-env.png)

#### <i class="icon-folder-open"></i> Directories :

- class/        (Contain all Hack and React JS class)
- css/          (Contain your own css styles)
- js-build      (Contain your JS compile bundle file)
- node_modules  (Contain all Node.JS dependencies : npm)
- vendor        (Contain all Hack dependencies : composer)

#### <i class="icon-file"></i> Files at root/

- composer.json (Composer dependencies)
- config.php    (Mysql credentials and others config like $url_path, ...)
- ini.php       ($PDO creation and lib includes)
- post.php      (Axios/AJAX request handler, a suggest to create a POST request handler for each ReactJS class)
