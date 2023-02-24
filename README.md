# ins# ins
使用vue3、vuex、vue-router製作<br/>
後端為strapi<br/>
<br/>
簡述:<br/>
模仿社群網站，用戶上傳圖片並寫下一些內容後，貼在首頁上，首頁顯示多久前貼文，點擊貼文也會顯示多久前發表評論，可以對貼文評論、喜歡、收藏。<br/>
<br/>
操作功能:<br/>
登入、註冊、搜尋貼文、評論、發表貼文、點讚、收藏、修改個人資料<br/>
<br/>
登入、註冊為進入首頁後，判斷有無登入，如果登入則進入貼文列表，否則進入登入及註冊頁面，登入後localStorage紀錄user資料及JWT，登入錯誤有提示。<br/>
搜尋貼文為將搜尋字串透過API接收擁有相關字串的貼文，過濾首頁貼文列表，列表上方標註搜尋詞，如沒寫字按搜尋保持原樣。<br/>
點擊貼文出現彈窗，透過API顯示該貼文及評論，可發表評論，寫進評論API，文章與評論透過Id比對。<br/>
發表貼文為點擊發表圖示後開啟彈窗，上傳圖片及描述後，透過API將圖片、描述、用戶訊息、時間戳透過API送到後端，彈窗關閉，首頁更新列表。<br/>
點讚、收藏透過API讀取貼文ID，將貼文資料寫進用戶資料，用戶在個人頁面可以讀取相關標記(點讚、收藏)的貼文列表<br/>
例:點攢 Id = 1 的文章，透過API將此貼文寫進用戶點讚列表，用戶進入個人頁面點擊 喜歡 點讚過的貼文列表即可透過api讀取該陣列<br/>
修改個人資料透過API讀取用戶ID找到對應用戶，修改資料後回到個人頁面。<br/>
<br/>
<br/>
login錯誤提示，未註冊可以切換元件變成註冊<br/>
![image](https://github.com/wang19903/ins/blob/main/login.gif)<br/>
登入成功進入首頁，進入個人頁面修改個人資料。<br/>
![image](https://github.com/wang19903/ins/blob/main/edit.gif)<br/>
發文後出現在第一格，可以發表評論、點擊喜歡、收藏，返回個人頁面後出現在下放列表<br/>
![image](https://github.com/wang19903/ins/blob/main/post.gif)<br/>
