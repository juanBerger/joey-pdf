let parent = document.getElementById("container");
let images = {}
let scrollpos = 0
let unloaded = false;

window.onbeforeunload = () => window.scrollTo(0, 0)

//For Mobile//
window.addEventListener("visibilitychange", function(e)
{
    if (document.visibilityState == 'hidden')
    {
        if (unloaded)
            return;
        unloaded = true;
        window.scrollTo(0, 0);
    }
});



window.onload = () => {

  let imageNodes = document.getElementsByClassName('image')
  for (let i=0; i < imageNodes.length; i++){
    let img = imageNodes[i]
    images[img.src] = img

    img.addEventListener('click', () => {    

      if (parent.childElementCount > 1){
        scrollpos = window.scrollY
        img.className = 'imageFocus'
        parent.innerHTML = ''
        window.scrollTo(0, 0)
        parent.appendChild(img)

      } 

      else {

        parent.innerHTML = ''
        for (const img in images){
          images[img].className = 'image'
          parent.appendChild(images[img])
  
        }
        window.scrollTo(0, scrollpos);
      }

    })
  }
}











