/*Initialises a counter on every page refresh*/
let counter = 1;

function getImages() {
    /*Gets y as the value from the input box*/
    let y = document.getElementById("quantity").value;
    console.log("y is " + y);

    /*Escape for invalid inputs*/
    if (y > 10 || y < 1) {
        invalidNumber(y);
        return;
    }

    /*Fetches y amount of random dog URLs*/
    let fetcher = "https://dog.ceo/api/breeds/image/random/" + y;
    fetch(fetcher)
    .then(response => response.json())
    .then(data => processImages(data));
}

/*Function for if y isn't a number between 1 and 10*/
function invalidNumber(y) {
    if (y>10) {
        alert(y + " is too many!");
    } else if (y == 0) {
        alert("Maybe you'd prefer cats?");
    } else {
        alert(y + " is an invalid term");
    }
}

function processImages(data) {

    /*Checks if there's already a picdiv, and if so, deletes it*/
    if (!!document.getElementById("picdiv") === true) {
        const element = document.getElementById("picdiv");
        element.remove();
    }

    /*Creates a new picdiv, styled as a vertical flexbox*/
    let picbox = document.createElement("div");
    document.body.appendChild(picbox);
    picbox.setAttribute("id","picdiv");

    /*TODO sort out ALL of this stuff. It works but. Jeez.*/
    var dogArray = data.message;
    for (var URL of dogArray) {
        var flexdiv = document.createElement("a");
        flexdiv.setAttribute("class", "box")
        flexdiv.setAttribute("href", URL)

        /*Regex stuff? Going to try to get this working to name the dogs*/
        let text1 = URL.match(/s\/.*\//);
        let text2 = text1[0].match(/\/.*\//);
        let text3 = text2[0].match(/[^\/].*[^\/]/g);

        let reg = new RegExp(/-/);
        let array = [];

        if (reg.test(text3) === true) {
            array = text3[0].split("-");
        } else {
            array[0] = text3;
        }

        let output = [];

        for(let i = 0; i<array.length; i++) {
            array[i] = array[i].toString();
            let splitted = array[i].split("");
            splitted[0] = splitted[0].toUpperCase();
            splitted = splitted.join("");
            output.unshift(splitted);
        }

        /*Turn the output into a string*/
        if (output.length === 2) {
            output = output.join(" ");
        } else {
            output = output[0];
        }

        /*Some of the breed names aren't written right when I call them
        in to my page. This corrects the ones I've found*/
        switch (output) {
            case "Blood Hound":
                output = "Bloodhound";
                break;
            case "Germanshepherd":
                output = "German Shepherd";
                break;
            case "Mexicanhairless":
                output = "Mexican Hairless";
                break;
            case "Germanlonghair Pointer":
                output = "German Longhair Pointer";
                break;
            case "Westhighland Terrier":
                output = "West Highland Terrier";
                break;
            case "Stbernard":
                output = "Saint Bernard";
                break;
            case "Staffordshire Bullterrier":
                output = "Staffordshire Bull Terrier";
                break;
            case "Flatcoated Retriever":
                output = "Flat-coated Retriever";
                break;
            case "Shihtzu":
                output = "Shih Tzu";
                break;
            case "Shepherd Australian":
                output = "Australian Shepherd";
                break;
            case "Bernese Mountain":
                output = "Bernese Mountain Dog";
                break;
        }







        var number = document.createElement("p");
        number.innerHTML = counter + ": " + output;
        var img = document.createElement("img");
        img.src = URL;
        flexdiv.appendChild(number);
        flexdiv.appendChild(img);
        document.getElementById("picdiv").appendChild(flexdiv);

        if (window.innerWidth < 540) {
            console.log("we have liftoff");
            var newlink = document.createElement("a");
            newlink.innerHTML = counter + ": " + output;
            newlink.href = URL;
            document.getElementById("linkdiv").appendChild(newlink);
            linebreak = document.createElement("br");
            document.getElementById("linkdiv").appendChild(linebreak);
        } else {
            var newlink = document.createElement("p");
            newlink.innerHTML = counter + ": " + URL;
            document.getElementById("linkdiv").appendChild(newlink);
        }

        counter++;
    }
}