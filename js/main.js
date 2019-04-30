//Variables
let $projects = $(".projects"),
    $project = $(".project"),
    $projectImgAfter = CSSRulePlugin.getRule(".project__img:after"),
    $projectImgBefore = CSSRulePlugin.getRule(".project__img:before"),
    tlProjects,
    tlProject;
tlProject = new TimelineMax({ repeat: -1, repeatDelay: 2 });
let projectClasses = $project.attr("class").split(" "),
    projectClass = projectClasses[1];
($pixel = $project.find(".pixel")),
    ($pixels = $project.find(".project__pixels")),
    ($projectTitle = $project.find(".project__title")),
    ($projectSubTitle = $project.find(".project__subtitle")),
    ($projectImg = $project.find(".project__img"));

tlProject
    .set([$projectTitle, $projectSubTitle, $pixel], { autoAlpha: 0 })
    .fromTo(
        $projectImg,
        0.6,
        { autoAlpha: 0, xPercent: "-200" },
        { autoAlpha: 1, xPercent: "-10", ease: Power4.easeInOut }
    )
    .add("imageIn")
    .staggerFromTo(
        $pixel,
        0.6,
        { autoAlpha: 0, x: "-=10" },
        { autoAlpha: 1, x: "0", ease: Power4.easeInOut },
        0.02,
        "-=0.2"
    )
    .add("pixelsIn")
    .fromTo(
        $projectTitle,
        0.6,
        { autoAlpha: 0, xPercent: "-50" },
        { autoAlpha: 1, xPercent: "-5", ease: Power4.easeInOut }
        )
        .fromTo(
            $projectSubTitle,
            0.6,
            { autoAlpha: 0, xPercent: "-50" },
            { autoAlpha: 1, xPercent: "-2", ease: Power4.easeInOut },
            "-=0.5"
            )
        .add("titleIn")
    .to(
        $projectTitle,
        4.3,
        { xPercent: "+=5", ease: Linear.easeNone },
        "titleIn-=0.1"
    )
    .to(
        $projectSubTitle,
        4.3,
        { xPercent: "+=2", ease: Linear.easeNone },
        "titleIn-=0.2"
    )
    .add("titleOut")
    .to($projectImg, 5, { xPercent: "0", ease: Linear.easeNone }, 'imageIn')
    .add("imageOut")
    .to($pixels, 4.1, { x: "-5", ease: Linear.easeNone }, 'pixelsIn')
    .to([$projectTitle, $projectSubTitle], 0.5, {
        autoAlpha: 0,
        xPercent: "+=10",
        ease: Power4.easeInOut
    }, 'titleOut')
    .to($projectImg, 0.4, {
        autoAlpha: 0,
        xPercent: "+=80",
        ease: Power4.easeInOut
    }, 'imageOut');
x
