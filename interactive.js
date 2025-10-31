// Search functionality
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    const pages = {
        'soil types': 'soil-types.html',
        'sandy': 'soil-types.html',
        'clay': 'soil-types.html',
        'loam': 'soil-types.html',
        'composition': 'soil-composition.html',
        'nutrients': 'soil-composition.html',
        'health': 'soil-health.html',
        'testing': 'soil-health.html',
        'agriculture': 'agriculture.html',
        'farming': 'agriculture.html',
        'crop': 'crop-guide.html',
        'planting': 'crop-guide.html',
        'conservation': 'conservation.html',
        'erosion': 'conservation.html',
        'articles': 'articles.html',
        'resources': 'resources.html'
    };
    
    for (let key in pages) {
        if (query.includes(key)) {
            window.location.href = pages[key];
            return;
        }
    }
    
    alert('No results found. Try: soil types, health, crops, or conservation');
}

document.getElementById('searchInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
});

// Scroll to top
window.onscroll = function() {
    const btn = document.getElementById('scrollToTop');
    if (btn) {
        btn.style.display = (document.documentElement.scrollTop > 300) ? 'block' : 'none';
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Calculator Modal
function openCalculator() {
    document.getElementById('calculatorModal').style.display = 'block';
}

function closeCalculator() {
    document.getElementById('calculatorModal').style.display = 'none';
}

function showCalcTab(tab) {
    document.querySelectorAll('.calc-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    if (tab === 'fertilizer') {
        document.getElementById('fertilizerCalc').style.display = 'block';
        event.target.classList.add('active');
    } else if (tab === 'compost') {
        document.getElementById('compostCalc').style.display = 'block';
        event.target.classList.add('active');
    } else if (tab === 'ph') {
        document.getElementById('phCalc').style.display = 'block';
        event.target.classList.add('active');
    }
}

function calculateFertilizer() {
    const area = parseFloat(document.getElementById('fertArea').value);
    const n = parseFloat(document.getElementById('fertN').value);
    
    if (!area || !n) {
        alert('Please fill all fields');
        return;
    }
    
    const amount = (area / 1000) * n;
    document.getElementById('fertResult').innerHTML = `
        <h3>Results:</h3>
        <p>You need approximately <strong>${amount.toFixed(2)} lbs</strong> of nitrogen fertilizer</p>
        <p>For 10-10-10 fertilizer, use: <strong>${(amount * 10).toFixed(2)} lbs</strong></p>
    `;
}

function calculateCompost() {
    const area = parseFloat(document.getElementById('compostArea').value);
    const depth = parseFloat(document.getElementById('compostDepth').value);
    
    if (!area || !depth) {
        alert('Please fill all fields');
        return;
    }
    
    const cubicFeet = (area * depth) / 12;
    const cubicYards = cubicFeet / 27;
    
    document.getElementById('compostResult').innerHTML = `
        <h3>Results:</h3>
        <p>You need approximately:</p>
        <p><strong>${cubicYards.toFixed(2)} cubic yards</strong> of compost</p>
        <p>Or <strong>${cubicFeet.toFixed(2)} cubic feet</strong></p>
    `;
}

function calculatePH() {
    const current = parseFloat(document.getElementById('currentPH').value);
    const target = parseFloat(document.getElementById('targetPH').value);
    const area = parseFloat(document.getElementById('phArea').value);
    
    if (!current || !target || !area) {
        alert('Please fill all fields');
        return;
    }
    
    const diff = target - current;
    let result = '';
    
    if (diff > 0) {
        const lime = (diff * area * 0.05).toFixed(2);
        result = `<h3>To Raise pH:</h3>
                  <p>Add approximately <strong>${lime} lbs of lime</strong></p>
                  <p>Apply in fall for best results</p>`;
    } else if (diff < 0) {
        const sulfur = (Math.abs(diff) * area * 0.02).toFixed(2);
        result = `<h3>To Lower pH:</h3>
                  <p>Add approximately <strong>${sulfur} lbs of sulfur</strong></p>
                  <p>Apply 3-4 months before planting</p>`;
    } else {
        result = '<p>Your pH is already at target level!</p>';
    }
    
    document.getElementById('phResult').innerHTML = result;
}

// Problem Solver
function openProblemSolver() {
    document.getElementById('problemSolverModal').style.display = 'block';
}

function closeProblemSolver() {
    document.getElementById('problemSolverModal').style.display = 'none';
}

function showSolution() {
    const problem = document.getElementById('problemSelect').value;
    const solutions = {
        compaction: `<h3>Soil Compaction Solutions:</h3>
                     <ul>
                        <li>Add organic matter (compost, aged manure)</li>
                        <li>Use a broadfork to aerate without turning</li>
                        <li>Avoid working wet soil</li>
                        <li>Plant cover crops with deep roots</li>
                        <li>Create raised beds for severe cases</li>
                     </ul>`,
        drainage: `<h3>Poor Drainage Solutions:</h3>
                   <ul>
                      <li>Add compost to improve soil structure</li>
                      <li>Install drainage tiles or French drains</li>
                      <li>Create raised beds (6-8 inches high)</li>
                      <li>Add sand and organic matter (50/50 mix)</li>
                      <li>Plant water-tolerant species</li>
                   </ul>`,
        erosion: `<h3>Erosion Control:</h3>
                  <ul>
                     <li>Plant ground cover immediately</li>
                     <li>Use mulch (3-4 inches deep)</li>
                     <li>Install terraces on slopes</li>
                     <li>Create contour planting</li>
                     <li>Add erosion control fabric</li>
                  </ul>`,
        ph: `<h3>pH Issues:</h3>
             <ul>
                <li>Test soil pH first (use kit or lab)</li>
                <li>Too acidic: Add lime (raises pH)</li>
                <li>Too alkaline: Add sulfur (lowers pH)</li>
                <li>Add compost to buffer pH changes</li>
                <li>Retest after 3-6 months</li>
             </ul>`,
        nutrients: `<h3>Nutrient Deficiency:</h3>
                    <ul>
                       <li>Get soil test to identify deficiencies</li>
                       <li>Add compost for general nutrition</li>
                       <li>Use targeted fertilizers (NPK)</li>
                       <li>Apply foliar sprays for quick fix</li>
                       <li>Plant nitrogen-fixing cover crops</li>
                    </ul>`
    };
    
    document.getElementById('solutionResult').innerHTML = solutions[problem] || '';
}

// Planting Calendar
function openCalendar() {
    document.getElementById('calendarModal').style.display = 'block';
    const month = new Date().getMonth() + 1;
    document.getElementById('monthSelect').value = month;
    showPlantingGuide();
}

function closeCalendar() {
    document.getElementById('calendarModal').style.display = 'none';
}

function showPlantingGuide() {
    const month = parseInt(document.getElementById('monthSelect').value);
    const guides = {
        1: { plant: 'Onions, Garlic (sets)', prepare: 'Plan garden layout, order seeds' },
        2: { plant: 'Tomatoes, Peppers (indoors)', prepare: 'Start seeds indoors, prune fruit trees' },
        3: { plant: 'Peas, Lettuce, Spinach', prepare: 'Prepare beds, add compost' },
        4: { plant: 'Carrots, Beets, Potatoes', prepare: 'Direct sow cool-season crops' },
        5: { plant: 'Beans, Corn, Squash', prepare: 'Transplant warm-season crops' },
        6: { plant: 'Cucumbers, Melons', prepare: 'Mulch and water regularly' },
        7: { plant: 'Fall crops (seeds)', prepare: 'Harvest and preserve' },
        8: { plant: 'Broccoli, Cabbage', prepare: 'Start fall crops' },
        9: { plant: 'Lettuce, Spinach, Kale', prepare: 'Plant cool-season crops' },
        10: { plant: 'Garlic, Cover crops', prepare: 'Harvest root vegetables' },
        11: { plant: 'Cover crops', prepare: 'Clean up garden, mulch beds' },
        12: { plant: 'Plan next season', prepare: 'Review and plan improvements' }
    };
    
    const guide = guides[month];
    document.getElementById('plantingResult').innerHTML = `
        <h3>This Month:</h3>
        <p><strong>Plant:</strong> ${guide.plant}</p>
        <p><strong>Prepare:</strong> ${guide.prepare}</p>
        <div style="margin-top: 1rem; padding: 1rem; background: #f0f8f0; border-radius: 8px;">
            <p><strong>💡 Tip:</strong> Always check your local frost dates and climate zone!</p>
        </div>
    `;
}

// Close modals on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};
