document.addEventListener("DOMContentLoaded", () => {
    const dogContainer = document.querySelector("#dog-bar")
    let isGoodDog = true
    const filterButton = document.querySelector("#good-dog-filter")
    filterButton.addEventListener("click", () => {
        isGoodDog = !isGoodDog; // Toggle the filter status
        filterButton.innerText = `Filter good dogs: ${isGoodDog ? 'ON' : 'OFF'}`;
        // clear existing dogs
        dogContainer.innerHTML = '';
        // Dog fetch and display based on the filter
        fetch('http://localhost:3000/pups')
            .then(res => res.json())
            .then(data => {
                data.forEach(pup => {
                    if (!isGoodDog || pup.isGoodDog) { // Check filter condion
                        const span = document.createElement("span");
                        span.innerText = pup.name;
                        dogContainer.appendChild(span);
                        span.addEventListener("click", () => displayPupInfo(pup));
                    }
                });
            });
    });
    
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        data.forEach(pup => {
            const span = document.createElement("span")
            span.innerText = pup.name
            dogContainer.appendChild(span)
            span.addEventListener("click", () => displayPupInfo(pup))
        })
    })
})

function displayPupInfo(pup) {
    const dogInfo = document.querySelector('#dog-info')

        dogInfo.innerText = ' '
    let img = document.createElement("img")
    img.src = pup.image

    let h2 = document.createElement("h2")
    h2.innerText = pup.name

    let btn = document.createElement("button")
    btn.innerText = pup.isGoodDog ? 'Good Dog!': 'Bad Dog!'

    
    dogInfo.appendChild(h2)
    dogInfo.appendChild(img)
    dogInfo.appendChild(btn)

    btn.addEventListener('click', (e) => {
        e.preventDefault()

        if (btn.innerText === 'Good Dog!') {
            
            fetch(`http://localhost:3000/pups/${pup.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: false
                })
            })
        } else {
            
            fetch(`http://localhost:3000/pups/${pup.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: true
                })
            })
        }
    })
}
