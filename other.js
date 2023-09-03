const score = () => {
    const sc = localStorage.getItem("score");
    const input = document.querySelector("input");
    let out = Number(sc.toString());
    const value = input.value.toString();
    out += Number(value);
    localStorage.setItem('score', out);
    setTimeout(() => {
        window.location.replace('main.html');
    }, 2500); 
} 