let currentTab = "all";
const tabActive = ['bg-blue-500', 'text-white'];
const tavInactive = ['bg-gray-200', 'text-gray-800'];

const allContainer = document.getElementById('all-container');
const interviewContainer = document.getElementById('interview-container');
const rejectedContainer = document.getElementById('rejected-container');
const emptyState = document.getElementById('no-jobs-message');

function switchTab(tab) {
    currentTab = tab;
    // console.log(tab);
    const tabs = ["all", "interview", "rejected"];

    for (const tabClick of tabs) {
        const tabName = document.getElementById("tab-" + tabClick);
        // console.log(tabName);
        if (tabClick === tab) {
            tabName.classList.remove(...tavInactive);
            tabName.classList.add(...tabActive);
        } else {
            tabName.classList.add(...tavInactive);
            tabName.classList.remove(...tabActive);
        }
    }

    const sections = [allContainer, interviewContainer, rejectedContainer];

    for (const section of sections) {
        section.classList.add('hidden');
    }
    emptyState.classList.add('hidden');

    if (tab === "all") {
        allContainer.classList.remove('hidden');
        if (allContainer.children.length < 1) {
            emptyState.classList.remove('hidden');
        }
    }
    else if (tab == 'interview') {
        interviewContainer.classList.remove('hidden');
        if (interviewContainer.children.length < 1) {
            emptyState.classList.remove('hidden', 'border-blue-700');
            emptyState.classList.add('border-green-700');
        }
    }
    else {
        rejectedContainer.classList.remove("hidden");
        if (rejectedContainer.children.length < 1) {
            emptyState.classList.remove('hidden', 'border-blue-700');
            emptyState.classList.add('border-red-700');
        }
    }
    updateCount();
}

// count update 
const totalCount = document.getElementById('total-count');
totalCount.innerText = allContainer.children.length;

const interviewCount = document.getElementById('interview-count');
interviewCount.innerText = interviewContainer.children.length;

const rejectedCount = document.getElementById('rejected-count');
rejectedCount.innerText = rejectedContainer.children.length;

const availableCount = document.getElementById('available-count');


switchTab(currentTab);


const jobsContainer = document.getElementById('jobs-container');

jobsContainer.addEventListener('click', function (event) {
    clickedElement = event.target;
    const jobCard = clickedElement.closest(".job-card");
    const cardParent = jobCard.parentNode;
    const status = jobCard.querySelector(".status");

    // console.log(jobCard);
    if (clickedElement.classList.contains("btn-interview")) {
        status.innerHTML = `<p class="bg-green-200 border border-green-300 text-green-500 font-medium py-2 px-4 w-35 rounded-sm text-center">INTERVIEW</p>`
        // console.log("interview btn clicked");
        interviewContainer.appendChild(jobCard);
        updateCount();
    }
    if (clickedElement.classList.contains("btn-rejected")) {
        status.innerHTML = `<p class="bg-red-200 border border-red-300 text-red-500 font-medium py-2 px-4 w-35 rounded-sm text-center">REJECTED</p>`
        // console.log("rejected btn clicked");
        rejectedContainer.appendChild(jobCard);
        updateCount();
    }
    if (clickedElement.classList.contains("btn-delete")) {
        // console.log("delete btn clicked");
        cardParent.removeChild(jobCard);
        updateCount();
    }

});

function updateCount() {
    // totalCount.innerText = allContainer.children.length;
    // interviewCount.innerText = interviewContainer.children.length;
    // rejectedCount.innerText = rejectedContainer.children.length;

    const counts = {
        all: allContainer.children.length,
        interview: interviewContainer.children.length,
        rejected: rejectedContainer.children.length

    };

    totalCount.innerText = counts.all;
    interviewCount.innerText = counts.interview;
    rejectedCount.innerText = counts.rejected;
    availableCount.innerText = counts[currentTab];
    if (counts[currentTab] < 1) {
        emptyState.classList.remove('hidden');
    }
}
updateCount();