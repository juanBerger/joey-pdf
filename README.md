# joey-pdf  

In the absence of running gen.py inside of netlify (currently doesn't work), you can run it offline, then push the new repo.
gen.py creates the html by adding as many image elements as there are images in ./public/img

Run pipenv shell to activate the virutal environment

## NOTE ##
Because of the way paths are parsed, filenames should be just numbers (and in the numerical order they are meant to appear)