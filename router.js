// courtesy of https://www.youtube.com/watch?v=JmSb1VFoP7w

document.querySelectorAll("nav a").forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        route(event);
    });
});

const routes = {
    404: {
        template: "/templates/404.html",
        title: "404",
    },
    "#about": {
        template: "/templates/about.html",
        title: "About",
    },
    "#learnings": {
        template: "/templates/learnings.html",
        title: "Learning",
    },
    "#projects": {
        template: "/templates/projects.html",
        title: "Projects",
    },
    "#blogs": {
        template: "/templates/blogs.html",
        title: "Blogs",
    }
};

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    const href = event.target.getAttribute("href");
    window.location.hash = href.startsWith("#") ? href : `#${href}`;
    locationHandler();
};

const locationHandler = async () => {
    let location = window.location.hash || "#about";
    console.log(location)
    const route = routes[location] || routes[404];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("app").innerHTML = html;
};

window.addEventListener("hashchange", locationHandler)
locationHandler();
