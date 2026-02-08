import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  server_url = "https://cookpedia-server-cpel.onrender.com"
  http = inject(HttpClient)

  // api function :

  //  get all recipes :called by home & recipes component
  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/recipes`)
  }

// register :called by register component
registerAPI(user:any){
  return this.http.post(`${this.server_url}/register`,user)
}

// login :called by login component
loginAPI(user:any){
  return this.http.post(`${this.server_url}/login`,user)
}

appendToken(){
  const token = sessionStorage.getItem('token')
  let headers = new HttpHeaders()
  if(token){
    headers = headers.append("Authorization",`Bearer ${token}`)
  }
  return {headers}
}


// view recipe :view component when page opens
viewRecipeAPI(recipeId:string){
  return this.http.get(`${this.server_url}/recipes/${recipeId}`,this.appendToken())
}

// related recipes
getRelatedRecipesAPI(cuisine:string){
  return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
}

// downloads/:id API
addToDownloadAPI(recipeId:string,reqBody:any){
  return this.http.post(`${this.server_url}/downloads/${recipeId}`,reqBody,this.appendToken())
}

// http://localhost:3000/recipes/697117f3ac5a8aad475cba9a/save :post - called view recipe component when save recipe btn clicked
addToSaveRecipeAPI(recipeId:string,reqBody:any){
  return this.http.post(`${this.server_url}/recipes/${recipeId}/save`,reqBody,this.appendToken())
}

// http://localhost:3000/recipe-collection get rqst from save recipe component when page loads
getUserSaveRecipesAPI(){
  return this.http.get(`${this.server_url}/recipe-collection`,this.appendToken())
}

// http://localhost:3000/recipe-collection/6979908e7dcd13a733bd0538 - delete from save recipe component when delete byn clicked
removeUserSaveRecipeItemAPI(recipeId:string){
  return this.http.delete(`${this.server_url}/recipe-collection/${recipeId}`,this.appendToken())
}

// http://localhost:3000/feedback :post by contact component when the submit btn clicked
addFeedbackAPI(reqBody:any){
  return this.http.post(`${this.server_url}/feedback`,reqBody)
}


// http://localhost:3000/user-downloads :get by profile component when page loads
getUserDownloadListAPI(){
   return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
}

// http://localhost:3000/user-edit
editUserPictureAPI(reqBody:any){
  return this.http.put(`${this.server_url}/user-edit`,reqBody,this.appendToken())
}

// feedback -approve :get by home page when it loads
getApproveFeedbackAPI(){
   return this.http.get(`${this.server_url}/feedbacks-approve`,)
}

// http://localhost:3000/user-list:get by admi  when page loads
getUserListAPI(){
   return this.http.get(`${this.server_url}/user-list`,this.appendToken())
}


// downloads
getDownloadListAPI(){
   return this.http.get(`${this.server_url}/downloads`,this.appendToken())
}


// http://localhost:3000/feedbacks get by admin feedback
getFeedbackListAPI(){
   return this.http.get(`${this.server_url}/feedbacks`,this.appendToken())
}

// http://localhost:3000/feedbacks/697a00d8589152769ee29fa5 :put by feedback when approve/reject btn clicked
updateFeedbackstatusAPI(id:string,reqBody:any){
   return this.http.put(`${this.server_url}/feedbacks/${id}`,reqBody,this.appendToken())
}


// http://localhost:3000/recipes :post rqst by manage recipe component when add btn cliked
addRecipeAPI(reqBody:RecipeModel){
   return this.http.post(`${this.server_url}/recipes`,reqBody,this.appendToken())
}

// http://localhost:3000/recipes/6982270df83fcd0d168f52ed	: DELETE BY RECIPES WHE DELETE BTN CLICKED 
removeRecipeAPI(id:string){
   return this.http.delete(`${this.server_url}/recipes/${id}`,this.appendToken())
}


// http://localhost:3000/recipes/6982270df83fcd0d168f52ed :put rqst by manage recipe coponent when update button clicked
editRecipeAPI(id:string,reqBody:RecipeModel){
   return this.http.put(`${this.server_url}/recipes/${id}`,reqBody,this.appendToken())
}

getChartData(){
  this.getDownloadListAPI().subscribe((res:any)=>{
    let downloadlistArray:any = []
    let output:any = {}
    res.forEach((item:any)=>{
      let cuisine = item.cuisine
      let currentCount = item.count
      if(cuisine in output){
     output[cuisine] += currentCount
      }else{
    output[cuisine] = currentCount
      }
    })
    console.log(output);
    for (let cuisine in output){
  downloadlistArray.push({name:cuisine,y:output[cuisine]})
    }
    localStorage.setItem("chart",JSON.stringify(downloadlistArray))
  })
}

}

