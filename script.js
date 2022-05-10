let counter = 1;

    function getImages() {
        let y = document.getElementById("quantity").value;
        console.log("y is " + y);
        let fetcher = "https://dog.ceo/api/breeds/image/random/" + y;
        fetch(fetcher)
        .then(response => response.json())
        .then(data => processImages(data));
    }

    /*
    function processImages(data) {
        console.log(data.message);
        var dogArray = data.message;
        for (var URL of dogArray) {
            var img = document.createElement("img");
            img.src = URL;
            document.body.appendChild(img);
            var source = document.createElement("p");
            source.innerHTML = URL;
            document.body.appendChild(source);
        }
    }
    */

    function processImages(data) {

        /*Checks if there's already a picdiv, and if so, deletes it*/
        if (!!document.getElementById("picdiv") === true) {
            const element = document.getElementById("picdiv");
            element.remove();
        }

        /*Creates a new picdiv, styled as a vertical flexbox*/
        let picbox = document.createElement("div");
        /*
        let x = document.getElementById("quantity").value;
            console.log(x);
            if (x == 1) {
                picbox.innerText = "Finding 1 dog!";
            } else {
                picbox.innerText = "Finding " + x + " dogs!";
            }
        */
        document.body.appendChild(picbox);
        picbox.setAttribute("id","picdiv");

    
        var dogArray = data.message;
        for (var URL of dogArray) {
            var flexdiv = document.createElement("a");
            flexdiv.setAttribute("class", "box")
            flexdiv.setAttribute("href", URL)

            /*Regex stuff? Going to try to get this working to name the dogs*/
            let text = URL.match(/s\/.*\//);
            let text2 = text[0].match(/\/.*\//);
            let text3 = text2[0].match(/[^\/].*[^\/]/g);
            let text4 = text3[0].replace("-", " ");
            console.log(text4);
            let reg = new RegExp(/" "/);
            console.log(reg);
            console.log(reg.test(text4));

            /*
            if (reg.test(text4) === true) {
                console.log("true");
            }
            */
            /*Next steps:
            1 if the string contains a space character:
              take the first word and the last word and swap them (with capturing groups?)
            2 capitalise the first letters of the words
            */

            var number = document.createElement("p");
            number.innerHTML = counter + ": " + text4;
            var img = document.createElement("img");
            img.src = URL;
            flexdiv.appendChild(number);
            flexdiv.appendChild(img);
            document.getElementById("picdiv").appendChild(flexdiv);

            var newlink = document.createElement("p");
            newlink.innerHTML = counter + ": " + URL;
            document.getElementById("linkdiv").appendChild(newlink);


            counter++;
        }

        /*
        for (var URL of dogArray) {
            var flexdiv = document.createElement("div");
            var number = document.createElement("p");
            number.innerHTML = counter;
            flex
            var img = document.createElement("img");
            img.src = URL;
        }
        */
    }