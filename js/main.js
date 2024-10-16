let allData = [];
let links = document.querySelectorAll('ul li');
let searchInput = document.getElementById('searchInput');

// إضافة الحدث عند الضغط على أي فئة
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        links.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
        let code = e.target.getAttribute('data-code');
        getData(code);
    });
}

async function getData(yousef) {
    document.getElementById('data').innerHTML = ""; 
    try {
const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${yousef}&apiKey=cdf7de091a1647fca49af9710d8a5a03`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        allData = (await response.json()).articles;
        display(); 
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('data').innerHTML = "<p>Error fetching data. Please try again later.</p>";
    }
}

// عرض البيانات في الصفحة
function display() {
    let content = '';
    for (let i = 0; i < allData.length; i++) {
        content += `
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${allData[i].title}</h5>
                    <p class="card-text">${allData[i].description}</p>
                    <a href="${allData[i].url}" class="btn btn-primary" target="_blank">Read More</a>
                </div>
            </div>
        </div>`;
    }
    document.getElementById('data').innerHTML = content;
}

// البحث في المقالات
searchInput.addEventListener('input', function () {
    let searchValue = searchInput.value.toLowerCase();
    let filteredData = allData.filter(article => article.title.toLowerCase().includes(searchValue));
    
    let content = '';
    for (let i = 0; i < filteredData.length; i++) {
        content += `
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${filteredData[i].title}</h5>
                    <p class="card-text">${filteredData[i].description}</p>
                    <a href="${filteredData[i].url}" class="btn btn-primary" target="_blank">Read More</a>
                </div>
            </div>
        </div>`;
    }
    document.getElementById('data').innerHTML = content;
});

// تحميل المقالات عند تحميل الصفحة لأول مرة
getData('business');
