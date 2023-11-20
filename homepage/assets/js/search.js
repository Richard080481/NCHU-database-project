function searchGoogle() {
    var searchQuery = encodeURIComponent(document.getElementById('searchBar').value);
    var searchURL = 'https://www.google.com/search?q=' + searchQuery;

    window.open(searchURL, '_blank');
    searchBar.value = '';
}

function searchYoutube() {
var youtubeQuery = document.getElementById('youtubeBar').value;
    // Check if the input is null or empty
    if (!youtubeQuery || youtubeQuery.trim() === '') {
        // If input is null or empty, go to the main YouTube page
        window.open('https://www.youtube.com/', '_blank');
    } else {
        // If input is not empty, perform the search
        var encodedQuery = encodeURIComponent(youtubeQuery);
        var searchURL = 'https://www.youtube.com/results?search_query=' + encodedQuery;
        window.open(searchURL, '_blank');
    }
    // Clear the input field
    document.getElementById('youtubeBar').value = '';
}

function checkLanguage() {
    const enteredText = translateBar.value;
    const englishRegex = /^[A-Za-z]+$/;
    if (englishRegex.test(enteredText)) {
        var translateQuery = encodeURIComponent(document.getElementById('translateBar').value);
        var searchURL = 'https://translate.google.com/?sl=en&tl=zh-TW&text=' + translateQuery +'&op=translate';
        window.open(searchURL, '_blank');
    } else {
        var translateQuery = encodeURIComponent(document.getElementById('translateBar').value);
        var searchURL = 'https://translate.google.com/?sl=auto&tl=en&text='+ translateQuery +'&op=translate';
        window.open(searchURL, '_blank');
    }
    translateBar.value = '';
}