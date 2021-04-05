import { timeAgo } from "./timesfunction.js";

const dataUrl = "https://api.github.com/repos/facebook/react/issues";

const htmlContainer = document.getElementById("first-container");

fetch(dataUrl)
  .then((response) => response.json())
  .then((data) => {
      data.map((issues) => {
        console.log(issues);
        const labelTitleEl = issues.labels.map(
          (label) =>
            `<span class="text-nowrap mr-1 label-text" style="background-color:#${label.color}">${label.name}</span>`
        ).join('');
        const issueTitle = `<span>${issues.title} <span>`;
        const issueTitleEl = `<p class="mr-1 mb-0 d-flex flex-wrap issue-title">${issueTitle}${labelTitleEl}</p>`;

        const desctextEl = `<p class="p-0 m-0 text-muted">#${issues.number} opened ${timeAgo(issues.created_at)} By ${issues.user.login}</p>`;


        let commentEl = '';
        if(issues.comments) {
        commentEl = `<p class="text-right"><svg class="octicon octicon-comment v-align-middle mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"></path></svg>${issues.comments}</p>`;
        } else if (!issues.comments) {
            commentEl = '';
        }

        const divEl = document.createElement("div");
        divEl.setAttribute("id", issues.number);
        divEl.innerHTML = `<a href="/comments.html?number=${issues.number}">
        <div class="issue-container p-2 py-2 d-flex justify-content-between align-items-center border-bottom">
          <div class="d-flex">
            <div class="align-self-start pl-2">
              <svg aria-hidden="true" class="octicon mr-1 text-success" height="16" role="img" viewBox="0 0 14 16" width="14" style="display: inline-block; fill:   currentcolor; user-select: none; vertical-align: middle;"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0   0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
            </div>
            <div class="flex-grow-1 pl-1">
                <div class="align-items-center">
                ${issueTitleEl}
                </div>
                <div class="my-1">
                ${desctextEl}
                </div>
            </div>
          </div>
          <div class="comment-count col-sm-1 col-2 p-0 mr-2">
           ${commentEl}
          </div>
        </div>
          </a>
          `;

        htmlContainer.append(divEl);
      });
  });
