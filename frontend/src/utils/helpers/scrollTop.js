
const scrollTop = () => {
    console.log("scrollTop() has called!")
    window.scrollTo({ top: 0, behavior: "smooth" })
}

export default scrollTop;