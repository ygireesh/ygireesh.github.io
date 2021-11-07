<script>
    let ratio = 1.7;
    let width = window.innerWidth;
    let height = 0;

    if (width < 1200) {
        width = width * 0.9;
        height = width / ratio;
    } else {
        height = 569;
        width = 960;
    }

    var projects = [
        {
            slug: "2PACX-1vRtAf8i36sKuyz17zrrmAzxxJw6tCG_H9D9HgDRPQm-PhKml5pcVtWYDzYRYTNyFQ",
            title: "PADDHU",
            description: "FINANCIAL TRACKING APP",
        },
        {
            slug: "2PACX-1vR28BUcgixaCWK1ctgWsb_8YAzqVrXKNWBb_mcEgi1uqbv0BRS8JrCPefGSmqPa6g",
            title: "CACHE HO",
            description: "BRANDING KIT",
        },
    ];

    var currentProject = 0;

    function selectProject(project_id) {
        currentProject = project_id;
        document.getElementById("overlay").style.visibility = "visible";
    }

    function closeProjectView() {
        document.getElementById("overlay").style.visibility = "hidden";
    }
</script>

<div>
    <h4>UX PROJECTS</h4>
    {#each projects as project, index}
        <a href="/#" on:click={() => selectProject(index)}>
            <div class="project-card">
                <img
                    src="/images/project-{index}.png"
                    alt=""
                    {width}
                    {height}
                    style="object-fit: cover"
                />
                <div class="no-underline">
                    <p class="title">{project["title"]}</p>
                    <p class="description">{project["description"]}</p>
                </div>
            </div>
        </a>
    {/each}

    <div id="overlay" style="visibility: hidden;">
        <iframe
            title="case-study-1"
            src="https://docs.google.com/presentation/d/e/{projects[
                currentProject
            ]['slug']}/embed?start=false&loop=true&delayms=60000"
            frameborder="0"
            {width}
            {height}
            allowfullscreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
        />
        <a href="/#" id="close-button" on:click={() => closeProjectView()}>
            Close
        </a>
    </div>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin: 0 auto;
        margin-top: 24px;
        margin-bottom: 24px;
    }

    h4 {
        text-align: center;
        font-weight: 300;
        margin-top: 16px;
        text-decoration: underline;
    }

    a {
        text-decoration: none;
    }

    .project-card {
        border: #626262 solid 1px;
    }

    .project-card:hover {
        box-shadow: 0 0 32px #000000;
    }

    .no-underline > .title,
    .description {
        text-decoration: none;
        margin: 6px;
        color: #626262;
    }

    .no-underline > .title {
        font-size: 24px;
    }

    .no-underline > .description {
        text-decoration: none;
        font-size: 20px;
    }

    #close-button {
        margin: 24px;
        padding: 12px 24px;
        font-size: 24px;
        background-color: black;
        color: white;
        cursor: pointer;
        border: white solid 1px;
    }

    #close-button:hover {
        background-color: white;
        color: black;
    }

    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 480px) {
        .no-underline > .description {
            font-size: 14px;
        }

        .no-underline > .title,
        .description {
            text-decoration: none;
            margin: 3px;
        }

        .no-underline {
            margin: 12px;
        }

        #close-button {
            font-size: 14px;
        }
    }

    @media (prefers-color-scheme: dark) {
        .project-card {
            border-color: #FCFCFC;
            
        }
        .no-underline > .title,
        .description {
            color: #FCFCFC;
        }
    }
</style>
