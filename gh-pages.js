var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/ygireesh/ygireesh.github.io.git', // Update to point to your repository  
        user: {
            name: 'ygireesh', // update to use your name
            email: 'gireesh.developer@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)