// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

particlesJS("backgroundCanvas",
    {
        "particles":
        {
            "number":
            {
                "value": 300,
                "density":
                {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color":
            {
                "value": "#ffffff"
            },
            "shape":
            {
                "type": "circle",
                "stroke":
                {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon":
                {
                    "nb_sides": 5
                },
            },
            "opacity":
            {
                "value": 1,
                "random": true,
                "anim":
                {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                }
            },
            "size":
            {
                "value": 3,
                "random": true,
                "anim":
                {
                    "enable": true,
                    "speed": 4,
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked":
            {
                "enable": false,
                "distance": 50,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move":
            {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract":
                {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity":
        {
            "detect_on": "window",
            "events":
            {
                "onhover":
                {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick":
                {
                    "enable": false,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes":
            {
                "grab":
                {
                    "distance": 100,
                    "line_linked":
                    {
                        "opacity": 1
                    }
                },
                "bubble":
                {
                    "distance": 100,
                    "size": 0, "duration": 2,
                    "opacity": 0, "speed": 3
                },
                "repulse":
                {
                    "distance": 100,
                    "duration": 0.2
                },
                "push":
                {
                    "particles_nb": 4
                },
                "remove":
                {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

