
window.onbeforeunload = () => window.scrollTo(0, 0)

//For Mobile//
// window.addEventListener("visibilitychange", function(e)
// {
//     if (document.visibilityState == 'hidden')
//     {
//         if (unloaded)
//             return;
//         unloaded = true;
//         window.scrollTo(0, 0);
//     }
// });


window.onload = () => {

  let parent = document.getElementById("container");
  let imageNodes = document.getElementsByClassName('image')
  let focusIdx = null
  let lastScrollPos = 0
  let focusState = 'grid'

  
  let images = []

  renderImage = (img, parent) => {

    parent.innerHTML = ''
    window.scrollTo(0, 0)
    img.className = 'imageFocus'
    parent.appendChild(img)
    let thisNode = document.getElementsByClassName('imageFocus')[0] //handle for when there are arrow presses
    //save the index of this image
    for (let i = 0; i < images.length; i++){
      if (images[i].src === thisNode.src){
        focusIdx = i
      }   
    }
   
    focusState = 'image'
  
  }

  renderGrid = (parent) => {
    parent.innerHTML = ''
    for (const img of images){          
      img.className = 'image'
      parent.appendChild(img)
    }
    
    window.scrollTo(0, lastScrollPos);
    focusState = 'grid'
  }

  
  for (let i=0; i < imageNodes.length; i++){
    let img = imageNodes[i]
    images.push(img)
    img.addEventListener('click', () => {
      if (focusState === 'grid'){
        lastScrollPos = window.scrollY
        renderImage(img, parent)
      }
      else {renderGrid(parent)}
    })
  }

  window.addEventListener('keydown', (event) => {
    

    //Around 130.png there is a break in the counting
    if (focusState === 'image'){
      
      if (event.key === 'ArrowLeft'){
        let idx = focusIdx - 1
        if (idx < 0){return}
        let prevImg = images[idx]
        if ((focusIdx + 1) % 3 == 0){
          lastScrollPos -= 700 //trial and error value, not that reliable
        }

        renderImage(prevImg, parent)
      } 
  
      else if (event.key === 'ArrowRight'){
        let idx = focusIdx + 1
        if (idx > images.length - 1){return}
        let nextImg = images[idx]
        if ((focusIdx + 1) % 3 == 0){
          lastScrollPos += 600
        }

        renderImage(nextImg, parent)
      }

    }
    
  })

}







/*

 let splitURL = focusNode.src.split('/')
        let filename = splitURL[splitURL.length - 1].split('.')[0]
        let idx = Number(filename) - 2
        console.log(idx)
*/