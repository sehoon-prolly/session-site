const storagePrefix = "vibe-coding-checklist";

function loadChecklistState(key) {
  try {
    const stored = localStorage.getItem(`${storagePrefix}:${key}`);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

function saveChecklistState(key, values) {
  try {
    localStorage.setItem(`${storagePrefix}:${key}`, JSON.stringify(values));
  } catch (error) {
    // Ignore storage failures so the page still works in private mode.
  }
}

function updateGroupProgress(group) {
  const inputs = Array.from(group.querySelectorAll("input[type='checkbox']"));
  const checkedCount = inputs.filter((input) => input.checked).length;
  const totalCount = inputs.length;
  const percent = totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100);
  const panel = group.closest(".progress-panel");

  if (panel) {
    const text = panel.querySelector("[data-progress-text]");
    const percentText = panel.querySelector("[data-progress-percent]");
    const fill = panel.querySelector("[data-progress-fill]");

    if (text) {
      text.textContent = `${checkedCount} / ${totalCount} 완료`;
    }

    if (percentText) {
      percentText.textContent = `${percent}%`;
    }

    if (fill) {
      fill.style.width = `${percent}%`;
    }
  }
}

function updateOverallProgress() {
  const checklistGroups = Array.from(document.querySelectorAll(".checklist"));
  const overallProgressText = document.getElementById("overall-progress-text");
  const overallProgressBar = document.getElementById("overall-progress-bar");
  const totals = checklistGroups.reduce(
    (result, group) => {
      const inputs = Array.from(group.querySelectorAll("input[type='checkbox']"));
      result.total += inputs.length;
      result.checked += inputs.filter((input) => input.checked).length;
      return result;
    },
    { total: 0, checked: 0 }
  );

  const percent = totals.total === 0 ? 0 : Math.round((totals.checked / totals.total) * 100);

  if (overallProgressText) {
    overallProgressText.textContent = `${totals.checked} / ${totals.total} 완료`;
  }

  if (overallProgressBar) {
    overallProgressBar.style.width = `${percent}%`;
  }
}

function initializeChecklists() {
  const checklistGroups = Array.from(document.querySelectorAll(".checklist"));

  checklistGroups.forEach((group) => {
    const key = group.dataset.storageKey;
    const inputs = Array.from(group.querySelectorAll("input[type='checkbox']"));
    const savedValues = loadChecklistState(key);

    inputs.forEach((input, index) => {
      input.checked = Boolean(savedValues[index]);
      input.addEventListener("change", () => {
        const values = inputs.map((item) => item.checked);
        saveChecklistState(key, values);
        updateGroupProgress(group);
        updateOverallProgress();
      });
    });

    updateGroupProgress(group);
  });

  updateOverallProgress();
}

function initializeCopyButtons() {
  const buttons = document.querySelectorAll(".copy-button");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.closest(".prompt-card")?.querySelector("code");

      if (!code) {
        return;
      }

      try {
        const textToCopy = code.textContent.trim();

        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const helper = document.createElement("textarea");
          helper.value = textToCopy;
          helper.setAttribute("readonly", "true");
          helper.style.position = "absolute";
          helper.style.left = "-9999px";
          document.body.appendChild(helper);
          helper.select();
          document.execCommand("copy");
          document.body.removeChild(helper);
        }

        const originalLabel = button.textContent;
        button.textContent = "복사 완료";
        window.setTimeout(() => {
          button.textContent = originalLabel;
        }, 1400);
      } catch (error) {
        button.textContent = "복사 실패";
        window.setTimeout(() => {
          button.textContent = "프롬프트 복사";
        }, 1400);
      }
    });
  });
}

function initializeApp() {
  initializeChecklists();
  initializeCopyButtons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
