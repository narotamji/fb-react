import { timeAgo } from "./timesfunction.js";

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("number");

const commentsUrl = `https://api.github.com/repos/facebook/react/issues/${myParam}/comments`;

const htmlContainerOne = document.getElementById("first-container");
const htmlContainerSecond = document.getElementById("second-container");
htmlContainerSecond.setAttribute("id", myParam);

const dataUrl = "https://api.github.com/repos/facebook/react/issues";
fetch(dataUrl)
  .then((response) => response.json())
  .then((data) => {

    data.map((issues) => {
      // console.log(issues);
      const issueTitle = `<p class="p-0 m-0 issue">${issues.title} <span class="text-muted">#${issues.number}</span></p>`;
      const issueState = `<p class="text-nowrap d-inline bg-success rounded p-1 m-0 text-white text-capitalize"><svg aria-hidden="true" class="octicon m-0 p-0" height="16" role="img" viewBox="0 0 14 16" width="14" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: middle;"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg> ${issues.state}</p>`;
      const issueCreatedDate = timeAgo(issues.created_at);
      const issueStateEl = `<span class="p-0 m-0 text-muted d-flex"><div class="mr-1">${issueState}</div><div><b>${issues.user.login}</b> opened this issue on ${issueCreatedDate}. <ins>${issues.comments} Comments</ins></div></span>`;
      const issueBody = issues.body;
      const userAvatarImg = `<img class="img-fluid rounded" src="${issues.user.avatar_url}" alt="user-image">`;
      const issueCardTitle = `
      <div class="avatar-img d-block d-sm-none py-2 pl-2">
      ${userAvatarImg}
      </div>
      <div class="pl-2">
      <p class="p-0 m-0">
      <b>${issues.user.login}</b> Commented on ${issueCreatedDate}
      </p>
      </div>`;

      const issueTitleEl = document.createElement('div');
      issueTitleEl.innerHTML = `
      <div class="m-0 p-0 d-flex flex-column flex-grow">
          <div class="my-3">${issueTitle}</div>
          <div class="">${issueStateEl}</div>
      </div>
      `;

      const issueCard = `
      <div class="border rounded">
        <div class="d-flex align-items-center border-bottom bg-light comment-title text-muted">
        ${issueCardTitle}
        </div>
        <div class="p-0 m-3 comment-body">
            <p>${issueBody}</p>
        </div>
      </div>
      `;

      if (myParam == issues.number) {
        htmlContainerOne.append(issueTitleEl);
        const issueDivEl = document.createElement("div");
        issueDivEl.classList = 'container-md container';
        issueDivEl.innerHTML = `
        <div class="my-4 d-flex">
          <div class="avatar-img mr-3 d-none d-sm-block">
            ${userAvatarImg}
          </div>
          <div class="flex-grow-1">
            ${issueCard}
          </div>
        </div>
      `;
        htmlContainerSecond.append(issueDivEl);
      }
    });
  })
  .then(() => {

    // fetching comment data
    fetch(commentsUrl)
      .then((response) => response.json())
      .then((data) => {
        data.map((comment) => {
          const commentText = comment.body;
          const avatarImage = `<img class="img-fluid rounded" src="${comment.user.avatar_url}" alt="user-image">`;
          const commentTitle = `
          <div class="avatar-img d-block d-sm-none py-1 pl-1">
      ${avatarImage}
      </div>
      <div class="pl-2">
      <p class="p-0 m-0"><b>${
        comment.user.login
      }</b> Commented on ${timeAgo(comment.created_at)}</p>
      </div>`;

          const commentCard = `
      <div class="border rounded">
        <div class="d-flex align-items-center border-bottom bg-light comment-title text-muted">
        ${commentTitle}
        </div>
        <div class="p-0 m-3 comment-body">
            <p>${commentText}</p>
        </div>
      </div>
      `;

          const commentDivEl = document.createElement("div");
          commentDivEl.classList = 'container-md container';
          commentDivEl.innerHTML = `
      <div class="my-4 d-flex">
        <div class="avatar-img mr-3 d-none d-sm-block">
          ${avatarImage}
        </div>
        <div class="flex-grow-1">
          ${commentCard}
        </div>
      </div>
      `;
          htmlContainerSecond.append(commentDivEl);
        });
      });
  });
