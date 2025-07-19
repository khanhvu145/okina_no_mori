const logoSvgColors = [];
window.addEventListener("DOMContentLoaded", function() {
    var pathSVG = this.document.querySelectorAll(".main_about_logo path");
    pathSVG.forEach(path => {
        const fill = path.getAttribute("fill") || "none";
        logoSvgColors.push(fill);
    });
    ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 
    runSequence();
    runSplitText();
    drawLogoSVG();
    handlePinAboutContent();
    handleRelationshipContent();
    handleWhatWeDoContent();
    ScrollTrigger.refresh(); 
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 
        handleRelationshipContent();
        handleWhatWeDoContent();
        ScrollTrigger.refresh(); 
    }, 300);
});

//Xử lý header
const header = document.querySelector('.app-header');
window.addEventListener('scroll', function() {
    const offset = window.pageYOffset;
    const logoEl = document.getElementById("header_navbar-logo-link-use");
    if(offset > 150) {
        header.classList.add('app-header-scroll');
        logoEl.setAttribute("href", "#logo_2");
    }
    else{
        header.classList.remove('app-header-scroll');
        logoEl.setAttribute("href", "#logo_1");
    }
})

//Xử lý slider
const container = document.querySelector(".main_slider");
const stripes = [
    { color: "#2365F6", direction: "bottom-to-top", imgUrl: "/assets/image/banner1.png" },
    { color: "#3AECDC", direction: "right-to-left", imgUrl: "/assets/image/banner2.png" },
    { color: "#FED446", direction: "right-to-top-left", imgUrl: "/assets/image/banner3.png" },
    { color: "#ED4D50", direction: "top-right-to-bottom-left", imgUrl: "/assets/image/banner4.png" },
    { color: "#60E750", direction: "double-line", imgUrl: "/assets/image/banner5.png" },
];
let index = 0;
let minSize = "20vw";
let maxWidth = "100vw";
let maxHeight = "100vh";
let duration = 0.5;

function applyRowLeftMargin() {
    const container = document.querySelector('.main_slider_logo_sub_4');
    const items = Array.from(container.children);
    if (items.length === 0) return;

    const containerWidth = container.clientWidth;
    const itemWidth = items[0].clientWidth;
    const itemsPerRow = Math.floor(containerWidth / itemWidth);

    items.forEach(item => item.style.margin = "0");

    items.forEach((item, index) => {
        const rowIndex = Math.floor(index / itemsPerRow);
        if (rowIndex % 2 === 0) {
        item.style.justifyContent = "left";
        } else {
        item.style.justifyContent = "right";
        }
    });
}

function createStripe({ color, direction, imgUrl }) {
    const stripe = document.createElement("div");
    const stripeSub = document.createElement("div");
    const imgEl = document.createElement("img");
    const logoDiv = document.createElement('div');
    stripe.classList.add("main_slider_item");
    stripe.classList.add(`main_slider_item_${index}`);
    stripe.style.backgroundColor = color;
    stripeSub.classList.add("main_slider_item_sub");
    stripeSub.classList.add(`main_slider_item_sub_${index}`);
    stripeSub.style.backgroundColor = color;
    imgEl.classList.add("main_slider_img");
    imgEl.classList.add(`main_slider_img_${index}`);
    imgEl.src = imgUrl;
    imgEl.style.opacity = 0;
    logoDiv.classList.add("main_slider_logo");
    logoDiv.classList.add(`main_slider_logo_${index}`);
    if (direction === "bottom-to-top") { 
        stripe.style.bottom = "0";
        stripe.style.left = "50%";
        stripe.style.transform = "translateX(-50%)";
        stripe.style.width = minSize;
        stripe.style.height = "0";
        imgEl.style.left = "55%";
        logoDiv.innerHTML = `
            <svg role="img" viewBox="0 0 97 98">
                <use href="#logo_o"></use>
            </svg>
        `;
        logoDiv.style.width = "80vh";
        logoDiv.style.top = "50%";
        logoDiv.style.left = "50%";
        logoDiv.style.opacity = 0;
        logoDiv.style.transform = "translate(-50%, -50%) scale(1.5)";
        logoDiv.style.rotate = "30deg";
    } else if(direction === "right-to-left") {
        stripe.style.top = "50%";
        stripe.style.right = "0";
        stripe.style.transform = "translateY(-50%)";
        stripe.style.width = "0";
        stripe.style.height = minSize;
        imgEl.style.transform = "translateX(-50%) scale(0)";
        logoDiv.innerHTML = `
            <div class="main_slider_logo_sub_2 main_slider_logo_sub_2_1">
                <svg role="img" viewBox="0 0 50 100">
                    <use href="#logo_ki"></use>
                </svg>
                <svg role="img" viewBox="0 0 50 100">
                    <use href="#logo_ki"></use>
                </svg>
            </div>
            <div class="main_slider_logo_sub_2 main_slider_logo_sub_2_2">
                <svg role="img" viewBox="0 0 50 100">
                    <use href="#logo_ki"></use>
                </svg>
                <svg role="img" viewBox="0 0 50 100">
                    <use href="#logo_ki"></use>
                </svg>
            </div>
            <div class="main_slider_logo_sub_2 main_slider_logo_sub_2_3">
                <svg role="img" viewBox="0 0 50 100">
                    <use href="#logo_ki"></use>
                </svg>
                <svg role="img" viewBox="0 0 50 100">
                    <use href="#logo_ki"></use>
                </svg>
            </div>
        `;
        logoDiv.style.top = "-16vh";
        logoDiv.style.left = "50%";
        logoDiv.style.transform = "translateX(-50%)";
        logoDiv.style.width = "100%";
    } else if(direction === "top-right-to-bottom-left") {
        stripe.style.top = "-100vw";
        stripe.style.left = "95%";
        stripe.style.transform = "rotate(25deg)";
        stripe.style.width = minSize;
        stripe.style.height = "0";
        stripe.style.transformOrigin = "top left";
        imgEl.style.transform = "translateX(-50%) scale(0)";

        var html = `<div class="main_slider_logo_sub_4">`;
        for (let i = 0; i < 30; i++) {
            html += '<div><svg role="img" viewBox="0 0 40 49"><use href="#logo_no"></use></svg></div>';
        }
        html += "</div>";
        logoDiv.innerHTML = html;
    } else if(direction === "right-to-top-left") {
        stripe.style.bottom = "0";
        stripe.style.right = "0";
        stripe.style.width = "0";
        stripe.style.height = minSize;

        stripeSub.style.bottom = "-100vw";
        stripeSub.style.left = "75%";
        stripeSub.style.width = "30vw";
        stripeSub.style.height = "0";
        stripeSub.style.transform = "rotate(-25deg)";
        stripeSub.style.transformOrigin = "bottom left";

        imgEl.style.top = "5px";

        logoDiv.innerHTML = `
            <svg role="img" viewBox="0 0 113 89">
                <use href="#logo_na"></use>
            </svg>
        `;
        logoDiv.style.width = "100vh";
        logoDiv.style.top = "50%";
        logoDiv.style.left = "50%";
        logoDiv.style.opacity = 0;
        logoDiv.style.transform = "translate(-50%, -50%) scale(0)";
    } else if(direction === "double-line") {
        stripe.style.top = "36%";
        stripe.style.left = "0";
        stripe.style.transform = "translateY(-36%)";
        stripe.style.width = "0";
        stripe.style.height = "10vw";

        stripeSub.style.bottom = "36%";
        stripeSub.style.right = "0";
        stripeSub.style.transform = "translateY(36%)";
        stripeSub.style.width = "0";
        stripeSub.style.height = "10vw";

        imgEl.style.left = "45%";

        logoDiv.innerHTML = `
            <div class="main_slider_logo_sub_5">
                <svg role="img" viewBox="0 0 120 112">
                    <use href="#logo_mori"></use>
                </svg>
                <svg role="img" viewBox="0 0 120 112">
                    <use href="#logo_mori"></use>
                </svg>
                <svg role="img" viewBox="0 0 120 112">
                    <use href="#logo_mori"></use>
                </svg>
            </div>
        `;
    }
    container.appendChild(stripe);
    container.appendChild(stripeSub);
    container.appendChild(logoDiv);
    container.appendChild(imgEl);
    if(direction === "top-right-to-bottom-left"){
        applyRowLeftMargin();
    }
    return { stripe,  stripeSub, imgEl, logoDiv };
}

function animateStripe(stripe, stripeSub, imgEl, logoDiv, direction, onComplete){
    const tl = gsap.timeline({ onComplete });
    if (direction === "bottom-to-top") {
        tl
            .to(stripe, { height: maxHeight, duration: duration, ease: "power2.out" })
            .to(stripe, { width: maxWidth, duration: duration, ease: "power2.in" })
            .to(logoDiv, { opacity: 1, scale: 1, transform: "translate(-50%, -50%)", rotate: 0, duration: 0.5, ease: "power2.out" })
            .to(imgEl, { opacity: 1, duration: 1.5, ease: "power2.out" }, "-=0.2")
            .to(imgEl, { left: "50%", duration: 1, ease: "power2.out" }, "<")
    } else if (direction === "right-to-left") {
        tl
            .to(stripe, { width: maxWidth, duration: duration, ease: "power2.out" })
            .to(stripe, { height: maxHeight, duration: duration, ease: "power2.in" })
            .to(".main_slider_logo_sub_2_1 svg", { opacity: 1, duration: 0.5, ease: "power2.out" })
            .to(".main_slider_logo_sub_2_2 svg", { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(".main_slider_logo_sub_2_3 svg", { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
            .to(imgEl, { opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.4")
            .to(imgEl, { scale: 1, duration: 0.8, ease: "power2.out" }, "<")
    } else if (direction === "top-right-to-bottom-left") {
        tl
            .to(stripe, { height: "300vw", duration: duration, ease: "power2.out" })
            .to(stripe, { width: "300vw", left: "0", duration: duration, ease: "power2.in" })
            .to(".main_slider_logo_sub_4 svg", { opacity: 1, transform: "rotate(0)", duration: 0.3, ease: "power2.out" })
            .to(imgEl, { opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.2")
            .to(imgEl, { scale: 1, duration: 0.8, ease: "power2.out" }, "<")
    } else if (direction === "right-to-top-left") {
        tl
            .to(stripe, { width: "60vw", duration: 0.3, ease: "power2.out" })
            .to(stripeSub, { height: "300vw", duration: 0.8, ease: "power2.out" }, "<")
            .to(stripe, { height: "300vw", duration: duration, ease: "power2.in" })
            .to(stripeSub, { width: "300vw", left: "0", duration: duration, ease: "power2.in" }, "<")
            .to(logoDiv, { opacity: 1, scale: 1, transform: "translate(-50%, -50%)", duration: 0.5, ease: "power2.out" })
            .to(imgEl, { opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.1")
            .to(imgEl, { top: "-10px", duration: 0.8, ease: "power2.out" }, "<")
    } else if (direction === "double-line") {
        tl
            .to(stripe, { width: maxWidth, duration: duration, ease: "power2.out" })
            .to(stripeSub, { width: maxWidth, duration: duration, ease: "power2.out" }, "<")
            .to(stripe, { height: maxHeight, duration: duration, ease: "power2.in" })
            .to(stripeSub, { height: maxHeight, duration: duration, ease: "power2.in" }, "<")
            .to(".main_slider_logo_sub_5", { opacity: 1, marginLeft: "-25vw", duration: 0.5, ease: "power2.out" })
            .to(imgEl, { opacity: 1, duration: 1.5, ease: "power2.out" }, "-=0.2")
            .to(imgEl, { left: "50%", duration: 1, ease: "power2.out" }, "<")
    }
    return tl;
}

function runSequence() {
    const stripeData = stripes[index % stripes.length];
    const items = createStripe(stripeData, index + 1);
    animateStripe(items.stripe, items.stripeSub, items.imgEl, items.logoDiv, stripeData.direction, () => {
        index++;
        runSequence(); 
        const element = document.querySelector(`.main_slider_item_${index - 2}`);
        if (element) {
            element.remove();
        }
        const elementSub = document.querySelector(`.main_slider_item_sub_${index - 2}`);
        if (elementSub) {
            elementSub.remove();
        }
        const elementImg = document.querySelector(`.main_slider_img_${index - 2}`);
        if (elementImg) {
            elementImg.remove();
        }
        const elementLogo = document.querySelector(`.main_slider_logo_${index - 2}`);
        if (elementLogo) {
            elementLogo.remove();
        }
    });
}

function runSplitText() {
    gsap.utils.toArray(".main_slider_title_item").forEach((item, index) => {
        const p = item.querySelector("p");
        const split = new SplitText(p, { type: "words, chars, lines" });
        const tl = gsap.timeline({ delay: index * 0.5 });
            tl.fromTo(item, 
            { width: "0", opacity: 0 },
            { width: "auto", opacity: 1, duration: 1, ease: "power2.in" }
        )
        tl.fromTo(split.chars, 
            { opacity: 0, rotationY: -10, transformOrigin: "50% 50% -160px" },
            { opacity: 1, stagger: 0.05, rotationY: 0, duration: 1.2, ease: "power1.out" }   
        , "-=0.1");
    });
}

function drawLogoSVG() {
    const classList = [
        ".main_about_logo_svg_o",
        ".main_about_logo_svg_ki",
        ".main_about_logo_svg_na",
        ".main_about_logo_svg_no",
        ".main_about_logo_svg_mori",
        ".main_about_logo_svg_stamp",
        ".main_about_logo_svg_tree",
        ".main_about_logo_svg_line",
        ".main_about_logo_svg_text",
    ];

    classList.forEach((item, index) => {
        const tl = gsap.timeline({
            delay: index * 0.5,
            scrollTrigger: {
                trigger: ".main_about_logo",
                start: "top 80%",
                toggleActions: "play none none reset",
            }
        });
        tl.set(`.main_about_logo ${item}`, { stroke: "#3A201A" });
        tl.from(`.main_about_logo ${item}`, {
            drawSVG: "0%",
            duration: 0.5,
            ease: "power1.inOut",
        });
    });
    
    gsap.utils.toArray(".main_about_logo path").forEach((path, index) => {
        const tl = gsap.timeline({
            delay: classList.length * 0.5,
            scrollTrigger: {
                trigger: ".main_about_logo",
                start: "top 80%",
                toggleActions: "play none none reset",
            }
        });
        tl.to(path, {
            fill: logoSvgColors[index],
            stroke: "none",
            duration: 0.5,
            ease: "power2.out",
        });
    });
}

function handlePinAboutContent() {
    const screenHeight = window.screen.height;
    gsap.to(".main_about_logo svg", {
        scrollTrigger: {
            trigger: "#main_about",
            start: "top top",
            end: `+=${screenHeight}`,
            scrub: true
        },
        opacity: 0.2
    });
    gsap.from(".main_about_content_title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".main_about_content_title",
            start: `top 90%`,
            toggleActions: "play none none reset"
        }
    });
    gsap.utils.toArray(".main_about_content_body-text p").forEach((p, i) => {
        gsap.from(p, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: p,
                start: `top 90%`,
                toggleActions: "play none none reset"
            }
        });
    });
    gsap.from(".main_about_content_body-link", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".main_about_content_body-link",
            start: `top 90%`,
            toggleActions: "play none none reset"
        }
    });
}

let swiper;
function handleRelationshipContent() {  
    const screenWidth = window.innerWidth;
    if(screenWidth > 1024) {
        //Bỏ swipper
        if(swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
        //Tạo animation
        const container = document.querySelector(".relationship_swiper_container");
        const wrapper = document.querySelector(".relationship_swiper_container .swiper-wrapper");
        const containerWidth = container.getBoundingClientRect().width;
        const wrapperWidth = wrapper.getBoundingClientRect().width;
        gsap.to(wrapper, {
            x: () => `-${wrapperWidth > screenWidth ? (wrapperWidth - screenWidth + (screenWidth - containerWidth)) : 0}px`,
            ease: "none",
            scrollTrigger: {
                trigger: "#main_relationship",
                start: "60% bottom",
                end: () => `+=${wrapperWidth > screenWidth ? wrapperWidth : 0}`,
                pin: ".main_relationship_container",
                scrub: true,
                anticipatePin: 1,
                toggleActions: "play none none reset"
            }
        });
    }
    else {
        swiper = new Swiper(".relationship_swiper_container", { 
            direction: 'horizontal',
            slidesPerView: "auto",
            spaceBetween: 30,
            scrollbar: {
                el: ".swiper-scrollbar",
                hide: true,
            },
        });
    }

    const split = new SplitText(".relationship_title", { type: "chars" });
    var colors = stripes.map(item => item.color)
    colors.push("var(--primary-color)");
    const masterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#main_relationship",
            start: "top 55%",
            toggleActions: "play none none reset",
        }
    });
    split.chars.forEach((char, i) => {
        const charTimeline = gsap.timeline();
        charTimeline.from(char, {
            x: -50,
            opacity: 0,
            duration: 0.7,
            ease: "power4"
        });
        colors.forEach((color, index) => {
            charTimeline.to(char, {
            color: color,
            duration: 0.2
            }, `<+=0.1`);
        });
        masterTimeline.add(charTimeline, i * 0.05);
    });

    ScrollTrigger.create({
        trigger: "#main_relationship",
        start: "top 55%",
        onEnter: () => {
            document.querySelector(".relationship_line").classList.add("is-active");
        },
        onLeaveBack: () => {
            document.querySelector(".relationship_line").classList.remove("is-active");
        }
    });

    ScrollTrigger.create({
        trigger: ".relationship_desc",
        start: `top 90%`,
        onEnter: () => {
            gsap.fromTo(".relationship_desc", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
        },
        onLeaveBack: () => {
            gsap.set(".relationship_desc", { y: 50, opacity: 0 });
        }
    });

    ScrollTrigger.create({
        trigger: ".relationship_swiper_container",
        start: `top 90%`,
        onEnter: () => {
            gsap.fromTo(".relationship_swiper_container", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
        },
        onLeaveBack: () => {
            gsap.set(".relationship_swiper_container", { y: 50, opacity: 0 });
        }
    });
}

function handleWhatWeDoContent() {
    CustomEase.create("easeForWhatWeDoContent", "0.215,0.610,0.355,1.000"); 
    ScrollTrigger.create({
        trigger: "#main_whatwedo",
        start: "top 60%",
        onEnter: () => {
            gsap.fromTo(".whatwedo_line",
                { rotate: "20deg" },
                { rotate: "20deg", duration: 0.01, ease: "easeForWhatWeDoContent" }
            );
            gsap.fromTo(".whatwedo_line", 
                { scaleX: 0 },
                { scaleX: 1, duration: 1.49, ease: "easeForWhatWeDoContent" }
            );
            document.querySelector(".main_whatwedo").classList.add("is-active");
        },
        onLeaveBack: () => {
            gsap.to(".whatwedo_line", { scaleX: 0, rotate: "20deg", duration: 1.5, ease: "easeForWhatWeDoContent" });
            document.querySelector(".main_whatwedo").classList.remove("is-active");
        }
    });

    const split = new SplitText(".whatwedo_title", { type: "chars" });
    var colors = stripes.map(item => item.color)
    colors.push("var(--white-color)");
    const masterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#main_whatwedo",
            start: "top top",
            toggleActions: "play none none reset",
        }
    });
    split.chars.forEach((char, i) => {
        const charTimeline = gsap.timeline();
        charTimeline.from(char, {
            x: -50,
            opacity: 0,
            duration: 0.7,
            ease: "power4"
        });
        colors.forEach((color, index) => {
            charTimeline.to(char, {
            color: color,
            duration: 0.2
            }, `<+=0.1`);
        });
        masterTimeline.add(charTimeline, i * 0.05);
    });

    // ScrollTrigger.create({
    //     trigger: ".whatwedo_block",
    //     start: "top 80%",
    //     onEnter: () => {
    //         gsap.fromTo(".whatwedo_block_section_title",
    //             { opacity: "0", transform: "translateY(-0.5em)" },
    //             { opacity: "1", transform: "translateY(0)", duration: 0.01, ease: "power2.out" }
    //         );
    //     },
    //     onLeaveBack: () => {

    //     }
    // });
    // gsap.utils.toArray(".whatwedo_block_section_title").forEach((el, i) => {
    //     gsap.from(el, {
    //         opacity: 0,
    //         y: 50,
    //         duration: 0.8,
    //         ease: "power2.out",
    //         scrollTrigger: {
    //             trigger: el,
    //             start: "top 80%",
    //             toggleActions: "play none none reverse"
    //         }
    //     });
    // });

}