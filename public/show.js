let aspectRatio = 1.302186878727634 // ~H/W the images are vary in size somewhat
let numberInRow = 4 // *** get number in a row
let unloaded = false

window.onbeforeunload = () => window.scrollTo(0, 0)
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




window.onresize = () => {
  resizePads(aspectRatio)
}

resizePads = (aspectRatio) => {

  let cssStyle = document.styleSheets[0].cssRules[1].style
  let targetImgHeight = (window.innerHeight * (1/6) - 12)  
  let targetImgWidth = (targetImgHeight / aspectRatio) + 10  
  let targetPadWidth = (window.innerWidth - (targetImgWidth * (numberInRow + 1))) / 2
  targetPadWidth < 0 ? targetPadWidth = 0 : targetPadWidth = targetPadWidth
  cssStyle.setProperty('--pad-col-width', String(targetPadWidth) + 'px')

}

window.onload = () => {

  let parent = document.getElementById("container");
  let imageNodes = document.getElementsByClassName('image')
  let focusIdx = null
  let lastScrollPos = 0
  let focusState = 'grid'
  let images = []
  
  resizePads(aspectRatio)

  //Function Definitions
  renderImage = (img, parent) => {

    parent.innerHTML = ''
    window.scrollTo(0, 0)
    img.className = 'imageFocus'
    parent.appendChild(img)
    let thisNode = document.getElementsByClassName('imageFocus')[0] //handle for when there are arrow presses
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

  advanceImage = (direction) => {

    if (focusState === 'image'){
        
      if (direction === 'ArrowLeft'){
        let idx = focusIdx - 1
        if (idx < 0){return}
        let prevImg = images[idx]
        if ((focusIdx + 1) % (6 * numberInRow) == 0){
          lastScrollPos -= window.innerHeight //trial and error value, not that reliable
        }
  
        renderImage(prevImg, parent)
      } 
  
      else if (direction === 'ArrowRight'){
        let idx = focusIdx + 1
        if (idx > images.length - 1){return}
        let nextImg = images[idx]
        if ((focusIdx + 1) % (6 * numberInRow) == 0){
          lastScrollPos += window.innerHeight
        }
  
        renderImage(nextImg, parent)
      }
  
    }
  
  }

  //Set up listeners
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

  document.addEventListener('swiped-left', (event) => {
      advanceImage('ArrowLeft')
  })

  document.addEventListener('swiped-right', (event) => {
    advanceImage('ArrowRight')
  })

  window.addEventListener('keydown', (event) => {
    advanceImage(event.key)    
    
  })
}


