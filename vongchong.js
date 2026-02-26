let currentTab = "all";
const tabActive = ['bg-blue-500', 'text-white'];
const tavInactive = ['bg-gray-200', 'text-gray-800'];

const allContainer = document.getElementById('all-container');
const interviewContainer = document.getElementById('interview-container');
const rejectedContainer = document.getElementById('rejected-container');
const emptyState = document.getElementById('no-jobs-message');

function switchTab(tab) {
    currentTab = tab;
    const tabs = ["all", "interview", "rejected"];

    for (const tabClick of tabs) {
        const tabName = document.getElementById("tab-" + tabClick);
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

const totalCount = document.getElementById('total-count');
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');
const availableCount = document.getElementById('available-count');

switchTab(currentTab);

const jobsContainer = document.getElementById('jobs-container');

function updateFilteredContainers() {
    interviewContainer.innerHTML = '';
    rejectedContainer.innerHTML = '';

    const allCards = allContainer.children;

    for (let i = 0; i < allCards.length; i++) {
        const card = allCards[i];
        const statusElement = card.querySelector('.status p');
        if (statusElement) {
            const statusText = statusElement.innerText.trim();

            if (statusText === 'INTERVIEW') {
                const clonedCard = card.cloneNode(true);
                interviewContainer.appendChild(clonedCard);
            } else if (statusText === 'REJECTED') {
                const clonedCard = card.cloneNode(true);
                rejectedContainer.appendChild(clonedCard);
            }
        }
    }
}

function findCardInAllContainer(jobCard) {
    const allCards = allContainer.children;
    const jobTitle = jobCard.querySelector('.job-title').innerText;
    const jobProvider = jobCard.querySelector('.job-provider').innerText;

    for (let i = 0; i < allCards.length; i++) {
        const card = allCards[i];
        const cardJobTitle = card.querySelector('.job-title').innerText;
        const cardJobProvider = card.querySelector('.job-provider').innerText;

        if (cardJobTitle === jobTitle && cardJobProvider === jobProvider) {
            return card;
        }
    }
    return null;
}

jobsContainer.addEventListener('click', function (event) {
    clickedElement = event.target;
    const jobCard = clickedElement.closest(".job-card");
    const status = jobCard.querySelector(".status");

    if (clickedElement.classList.contains("btn-interview")) {
        // All container-এ original card খুঁজে তার status আপডেট
        const originalCard = findCardInAllContainer(jobCard);
        if (originalCard) {
            const originalStatus = originalCard.querySelector(".status");
            originalStatus.innerHTML = '<p class="bg-green-200 border border-green-300 text-green-500 font-medium py-2 px-4 w-35 rounded-sm text-center">INTERVIEW</p>';
        }

        updateFilteredContainers();
        updateCount();
    }

    if (clickedElement.classList.contains("btn-rejected")) {
        // All container-এ original card খুঁজে তার status আপডেট
        const originalCard = findCardInAllContainer(jobCard);
        if (originalCard) {
            const originalStatus = originalCard.querySelector(".status");
            originalStatus.innerHTML = '<p class="bg-red-200 border border-red-300 text-red-500 font-medium py-2 px-4 w-35 rounded-sm text-center">REJECTED</p>';
        }

        updateFilteredContainers();
        updateCount();
    }

    if (clickedElement.classList.contains("btn-delete")) {
        const originalCard = findCardInAllContainer(jobCard);
        if (originalCard) {
            originalCard.remove();
        }

        updateFilteredContainers();
        updateCount();
    }
});

function updateCount() {
    const allJobs = allContainer.children.length;
    const interviewJobs = interviewContainer.children.length;
    const rejectedJobs = rejectedContainer.children.length;

    totalCount.innerText = allJobs;
    interviewCount.innerText = interviewJobs;
    rejectedCount.innerText = rejectedJobs;

    if (currentTab === 'all') {
        availableCount.innerText = allJobs;
        if (allJobs < 1) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }
    else if (currentTab === 'interview') {
        availableCount.innerText = interviewJobs;
        if (interviewJobs < 1) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }
    else if (currentTab === 'rejected') {
        availableCount.innerText = rejectedJobs;
        if (rejectedJobs < 1) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }
}

updateFilteredContainers();
updateCount();