<script>
    export let isMobile;
    let year = new Date().getFullYear();

    let email = "mailto:gireesh.developer@gmail.com";
    let resume =
        "https://drive.google.com/file/d/1RF_TYT1L3Fq5MKMtDafNmShwrGnICZTB/view";
    let linkedin = "https://linkedin.com/in/GireeshYejju";
    let twitter = "https://twitter.com/GireeshYejju";
</script>

<footer>
    {#if !isMobile}
        <div id="footer-row" style="padding-bottom: 24px;">
            <div />
            <a target="_blank" href={email}>Email</a>
            <a target="_blank" href={resume}>Resume</a>
            <p id="copyright">
                Copyright © {year} Gireesh Yejju. All Rights Reserved.
            </p>
            <a target="_blank" href={linkedin}>LinkedIn</a>
            <a target="_blank" href={twitter}>Twitter</a>
            <div />
        </div>
    {/if}
    {#if isMobile}
        <div id="footer-row" style="padding-bottom: 10px;">
            <a target="_blank" href={email}>Email</a>
            <a target="_blank" href={resume}>Resume</a>
            <a target="_blank" href={linkedin}>LinkedIn</a>
            <a target="_blank" href={twitter}>Twitter</a>
        </div>
        <div id="footer-copyright-section">
            <p id="copyright">
                Copyright © {year} Gireesh Yejju. All Rights Reserved.
            </p>
        </div>
    {/if}
</footer>

<style>
    #footer-row,
    #footer-copyright-section {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 16px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
    }

    #copyright {
        font-size: 10px;
        font-weight: 300;
        text-align: center;
    }

    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        -webkit-box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.5);
        box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.5);
        background-color: white;
    }

    @media (prefers-color-scheme: dark) {
        footer {
            background-color: #292929;
        }
    }
</style>
