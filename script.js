
const nav = document.createElement('nav')
nav.setAttribute('id', 'navi')
nav.className = 'menu'

const fornav = document.createElement('div')
fornav.setAttribute('id', 'fornav')

const fornavchild = document.createElement('div')
fornavchild.id = 'fornavchild'

const label = document.createElement('label')
label.setAttribute('id', 'menu-toggle')
label.className = 'menus-label'

const span = document.createElement('span')
span.textContent = 'toggle'
label.appendChild(span)
nav.appendChild(label)

const headerContainers = document.createElement('div')
headerContainers.id = 'headercontainers'
const headerchild = document.createElement('div')
headerchild.id = 'headerchild'


const sumslogocontainer = document.createElement('div')
sumslogocontainer.id = 'sumslogocontainer'
const sumslogo = document.createElement('img')
sumslogo.id = 'sumbotlogo'
sumslogo.src = '1.png'
sumslogocontainer.appendChild(sumslogo)
headerchild.appendChild(sumslogocontainer)


const sumbotcontainer = document.createElement('div')
sumbotcontainer.id = 'sumbotcontainer'
const summarizationscontainer = document.createElement('div')
summarizationscontainer.id = 'summarizationscontainer'

const form = document.createElement('form')
form.id = 'summarizationform'

const textarea = document.createElement('textarea')
textarea.setAttribute('id', 'textarea')
textarea.name = "text"


const sumbtn = document.createElement('button')
sumbtn.textContent = 'Summarize'
sumbtn.setAttribute('id', 'sumbtn')



const numSentencesInput = document.createElement("input");
numSentencesInput.setAttribute("type", "range");
numSentencesInput.setAttribute('min','1')
numSentencesInput.setAttribute('max','10')
numSentencesInput.setAttribute('value','3')
numSentencesInput.setAttribute("id", "num_sentences");
numSentencesInput.setAttribute("name", "num_sentences");
numSentencesInput.setAttribute("value", "3");  
numSentencesInput.setAttribute('placeholder', 'Enter num of Sentences')

const formfooter = document.createElement('div')
formfooter.setAttribute('id','formfooter')
const formfooterContainer = document.createElement('div')
formfooterContainer.setAttribute('id','formfootercontainer')

formfooterContainer.appendChild(numSentencesInput)
formfooterContainer.appendChild(sumbtn)
formfooter.appendChild(formfooterContainer)

form.appendChild(textarea)
form.appendChild(formfooter)


summarizationscontainer.appendChild(form)
sumbotcontainer.appendChild(summarizationscontainer)


const sumdiv = document.createElement('div')
sumdiv.setAttribute('id', 'sumdiv')

const childsumdiv = document.createElement('div')
childsumdiv.setAttribute('id', 'childsumdiv')
const p = document.createElement("p");
p.id = 'para'
// p.textContent = 'hello'

childsumdiv.appendChild(p)
sumdiv.appendChild(childsumdiv)
summarizationscontainer.appendChild(sumdiv)


const navFooter = document.createElement('div')
navFooter.setAttribute('id','navFooter')
const navFooterContainer = document.createElement('div')
navFooterContainer.setAttribute('id','navFooterContainer')
const footerHeader = document.createElement('h2')
footerHeader.innerHTML = 'Our AI uses Deep leearning NLP to preserve important text during and after summarization process to provide more coherent <br>and concise summary.'
navFooterContainer.appendChild(footerHeader)
navFooter.appendChild(navFooterContainer)

var viewportMeta = document.createElement('meta')
viewportMeta.name = 'viewport'
viewportMeta.content = 'width=device-width, initial-scale=1'

var head = document.head || document.getElementsByTagName('head')[0]


headerContainers.appendChild(headerchild)
fornavchild.appendChild(headerContainers)
fornavchild.appendChild(sumbotcontainer)
fornavchild.appendChild(navFooter)
fornav.appendChild(fornavchild)
nav.appendChild(fornav)

head.appendChild(viewportMeta)

document.body.appendChild(nav)


const menuToggle = document.querySelector("#menu-toggle");
const menu = document.querySelector("#navi");

function toggleMenu() {
    menu.classList.toggle("active");
    localStorage.setItem("menuState", menu.classList.contains("active") ? "open" : "closed");
}

menuToggle.addEventListener("click", toggleMenu);

const storedMenuState = localStorage.getItem("menuState");

if (storedMenuState === "open") {
    menu.classList.add("active");
}

form.action = "http://localhost:5000/summarizes";
form.method = "post";

sumbtn.addEventListener("click", (event) => {
    event.preventDefault(); 

    if (!menu.classList.contains("active")) {
        menu.classList.add("active"); 
    }

    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({
            text: formData.get("text"), 
            num_sentences: formData.get("num_sentences"), 
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            p.innerText = data.summary;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

