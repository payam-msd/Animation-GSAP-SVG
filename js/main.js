(function($) {
    //* Variables
    let $projects = $(".projects"),
        $project = $(".project"),
        $projectImgAfter = CSSRulePlugin.getRule(".project__img:after"),
        $projectImgBefore = CSSRulePlugin.getRule(".project__img:before"),
        tlProjects,
        tlProject,
        tlCircles;

    tlCircles = new TimelineMax({ repeat: -1 });
    tlCircles
    .to($projectImgBefore, .8 , {cssRule:{top: '5px'} , ease: Linear.easeNone})
    .to($projectImgBefore, .8 , {cssRule:{left: '5px'} , ease: Linear.easeNone})
    .to($projectImgBefore, .8 , {cssRule:{top: '-5px'} , ease: Linear.easeNone})
    .to($projectImgBefore, .8 , {cssRule:{left: '-5px'} , ease: Linear.easeNone})
    .to($projectImgAfter, .7 , {cssRule:{bottom: '6px'} , ease: Linear.easeNone}, '0')
    .to($projectImgAfter, .7 , {cssRule:{right: '6px'} , ease: Linear.easeNone}, '0.7')
    .to($projectImgAfter, .7 , {cssRule:{bottom: '-6px'} , ease: Linear.easeNone}, '1.1')
    .to($projectImgAfter, .7 , {cssRule:{right: '-6px'} , ease: Linear.easeNone}), '1.5';

    //* Main Project Timeline
    tlProjects = new TimelineMax();
    tlProjects.set($projects, { autoAlpha: 1 });

    tlProject = new TimelineMax({ repeat: -1, repeatDelay: 2 });

    $project.each(function(element, index) {
        let projectClasses = $(this)
            .attr("class")
            .split(" ");
        projectClass = projectClasses[1];
        ($pixel = $(this).find(".pixel")),
            ($pixels = $(this).find(".project__pixels")),
            ($projectTitle = $(this).find(".project__title")),
            ($projectSubTitle = $(this).find(".project__subtitle")),
            ($projectImg = $(this).find(".project__img"));

        //* Project CTA
        let tlProjectsCTA = new TimelineMax();
        $projectLink = $(this).find(".button-container");
        $projectLinkButton = $(this).find(".button");
        $projectLinkSpan = $(this).find(".bp");
        $projectLinkText = $(this).find(".bp-text");

        tlProjectsCTA
            .to($projectSubTitle, 0.3, {
                autoAlpha: 0,
                yPercent: 100,
                ease: Back.easeOut
            })
            .staggerFrom(
                $projectLinkSpan,
                0.3,
                { autoAlpha: 0, yPercent: -100, ease: Back.easeOut },
                0.1
            )
            .from(
                $projectLinkText,
                0.3,
                { autoAlpha: 0, x: "-100%", ease: Power4.easeInOut },
                "-=.1"
            );
        //* project Loader
        tlProjectLoader = new TimelineMax({ paused: true });
        $loader = $(this).find(".loader");
        tlProjectLoader
            .to([$projectImgAfter, $projectImgBefore], 0.4, {
                cssRule: { opacity: "0" }
            })
            .fromTo(
                $loader,
                5,
                { strokeDasharray: 547, strokeDashoffset: 547 },
                {
                    strokeDasharray: 547,
                    strokeDashoffset: 0,
                    ease: Power0.easeNone
                }
            )
            .to($loader, 0.4, { autoAlpha: 0, onComplete: resumeProjects })
            .to(
                [$projectImgAfter, $projectImgBefore],
                0.4,
                {
                    cssRule: { opacity: "1" }
                },
                "-=.4"
            );

        //* Create Project Timeline
        tlProject
            .set($(this), { zIndex: 1 })
            .set([$projectTitle, $projectSubTitle, $pixel], { autoAlpha: 0 })
            .fromTo(
                $projectImg,
                0.6,
                { autoAlpha: 0, xPercent: "-200" },
                {
                    autoAlpha: 1,
                    xPercent: "-10",
                    ease: Power4.easeInOut,
                    onStart: updateClass,
                    onStartParams: [projectClass]
                }
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
                { autoAlpha: 1, xPercent: "-3", ease: Power4.easeInOut }
            )
            .fromTo(
                $projectSubTitle,
                0.6,
                { autoAlpha: 0, xPercent: "-50" },
                { autoAlpha: 1, xPercent: "2", ease: Power4.easeInOut },
                "-=0.5"
            )
            .add("titleIn")
            .add(tlProjectsCTA, "+=2") //? Nesting Timelines
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
            .to(
                $projectImg,
                5,
                {
                    xPercent: "0",
                    ease: Linear.easeNone,
                    onComplete: pauseProjects,
                    onCompleteParams: [projectClass, tlProjectLoader]
                },
                "imageIn"
            )
            .add("imageOut")
            .to($pixels, 4.1, { x: "-5", ease: Linear.easeNone }, "pixelsIn")
            .to(
                [$projectTitle, $projectSubTitle, $projectLink],
                0.5,
                {
                    autoAlpha: 0,
                    xPercent: "+=10",
                    ease: Power4.easeInOut
                },
                "titleOut"
            )
            .to(
                $projectImg,
                0.4,
                {
                    autoAlpha: 0,
                    xPercent: "+=80",
                    ease: Power4.easeInOut
                },
                "imageOut"
            );
        //? add to the Projects Master timeline
        tlProjects.add(tlProject);
    });
    //? Create a Function to Update each body class
    function updateClass(projectClass) {
        $("body").attr("class", projectClass);
    }
    //? Create a Function to Pause
    function pauseProjects(projectClass, tlProjectLoader) {
        tlProjects.pause();
        if (projectClass != "project00") {
            tlProjectLoader.play();
            tlProjectLoader.seek(0);
        }
    }
    //? Create a Function to resume
    $(".project00 .button").on("click", function(e) {
        e.preventDefault();
        tlProjects.resume();
    });
    //? Function that resume the picture
    function resumeProjects() {
        tlProjects.resume();
    }
    //?
})(jQuery);
