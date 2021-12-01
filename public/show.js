//let base = 'http://127.0.0.1:5500'
let base = 'https://pdf-on-utopia.netlify.app'
let parent = document.getElementById("container");
let images = {}

window.onload = () => {

  let imageNodes = document.getElementsByClassName('image')
  for (let i=0; i < imageNodes.length; i++){
    let img = imageNodes[i]
    images[img.src] = img

    img.addEventListener('click', () => {    

      if (parent.childElementCount > 1){
        const url = new URL(img.src)
        history.replaceState({}, '', url);
        img.className = 'imageFocus'
        parent.innerHTML = ''
        window.scrollTo(0, 0)
        parent.appendChild(img)

      } 

      else {
        const url = new URL('/public/index.html', base)
        history.replaceState({}, '', url);
        parent.innerHTML = ''
        for (const img in images){
          images[img].className = 'image'
          parent.appendChild(images[img])
  
        }
      }

    })
  }
}





















// xhr.open("GET", "/public/img", true);
// xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
// xhr.responseType = 'document';
// xhr.onload = () => {
//   if (xhr.status === 200) {
//     console.log(xhr.response)
//     console.log(xhr.responseXML)
//     console.log(xhr.responseURL)
//     var elements = xhr.response.getElementsByTagName("a");
    
//     for (x of elements) {
//       if (x.href.match(/\.(jpe?g|png|gif)$/) ) { 
//         let img = document.createElement("img");
//         img.src = x.href;
//         img.className = 'image'
//         images[x.title] = img
//         parent.appendChild(img)
        
//         img.addEventListener('click', () => {  
          
//           if (window.location.pathname.includes('html')){
//             const url = new URL(img.src)
//             history.replaceState({}, '', url);
//             img.className = 'imageFocus'
//             parent.innerHTML = ''
//             window.scrollTo(0, 0)
//             parent.appendChild(img)

//           } 

//           else {
//             const url = new URL('/public/index.html', base)
//             history.replaceState({}, '', url);
//             parent.innerHTML = ''
//             for (const img in images){
//               images[img].className = 'image'
//               parent.appendChild(images[img])

//             }
//           }
//         })
//       } 
//     };

//     console.log(images)
//   } 
//   else {
//     alert('Request failed. Returned status of ' + xhr.status);
//   }
// }

// xhr.send()




//var folder = "img/";
// $.ajax({
//     url : folder,
//     success: function (data) {
//         console.log(data)
//         $(data).find("a").attr("href", function (i, val) {
//           console.log(val)  
//           if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                
            
            
            
//               $("body").append( "<img src='"+ folder + val +"'>" );
//             } 
//         });
//     }
// });




// let result = await fetch('./img')
// let text = await result.text()
// let doc = new DOMParser().parseFromString(text, 'text/html')
// console.log(doc)
