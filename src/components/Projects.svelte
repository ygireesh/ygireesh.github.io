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

    // if (width > 2000) {
    //     width = width / 1.75;
    // } else if (width > 1200) {
    //     width = width / 2.35;
    // } else {
    //     width = width * 0.95;
    // }
</script>

<div>
    <h4>UX PROJECTS</h4>
    <iframe
        title="case-study"
        src="https://docs.google.com/presentation/d/e/2PACX-1vRtAf8i36sKuyz17zrrmAzxxJw6tCG_H9D9HgDRPQm-PhKml5pcVtWYDzYRYTNyFQ/embed?start=true&loop=true&delayms=60000"
        frameborder="0"
        {width}
        {height}
        allowfullscreen="true"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
    />
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
</style>
