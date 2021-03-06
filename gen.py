import os
from airium import Airium

images = []
for root, dirs, files in os.walk('./public/img'):
    for file in files:
        images = [int(os.path.splitext(image)[0]) for image in files if image.endswith(('jpg', 'jpeg', 'png', 'svg', 'gif'))]


images.sort()
for i,image in enumerate(images):
    images[i] = str(image) + '.png'

a = Airium()

a('<!doctype html>')
with a.html(lang="en"):
    with a.head():
        a.meta(charset="utf-8")
        a.title(_t="PDF on Utopia")
        a.link(rel="stylesheet", href="show.css")

    with a.body():
        with a.div(id='container'):
            for image in images:
                path = './img/' + image
                a.img(src=path, klass='image')
        
        
        a.script(src="show.js")
        

html = str(a)
with open('./public/index.html', 'wb') as f:
    f.write(bytes(html, 'utf-8'))


