import { 
  FETCH_POSTS,
  FETCH_POSTS_INFINITELY,
  FETCH_POST,
  FETCH_EDIT_POST,
  FETCH_NEW_POST, 
  SAVE_POST,
  TOGGLE_POST ,
  RESET_POST,
} from 'shared/constants/actions';

const INITIAL_STATE = { 
  posts: [],
  loading: false,
  limit: 20, 
  page: 1, 
  total: 0,
  post: { title: '', publishedAt: '' },
  postForm: { },
  errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS_INFINITELY.REQUEST:
      return { ...state, loading: true };

    case FETCH_POSTS_INFINITELY.SUCCESS:
      let posts;
      // initiate posts in the first loading, after the second loading, add posts to the previously loaded posts
      if(action.payload.page === 1) {
        posts = [...action.payload.posts]
      } else {
        posts = [...state.posts, ...action.payload.posts]
      }

      return {
        ...state,
        posts,
        loading: false,
        limit: action.payload.limit,
        page: action.payload.page,
        total: action.payload.total
      };
    
    case FETCH_POSTS.SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        limit: action.payload.limit,
        page: action.payload.page,
        total: action.payload.total
      };
    
    case RESET_POST:
      return { ...state, post: {}, errorMessage: '' };

    case FETCH_POST.SUCCESS:
      return {...state, post: action.payload.post, errorMessage: '' };

    case FETCH_EDIT_POST.SUCCESS:
      return { ...state, postForm: action.payload.postForm, errorMessage: '' };
    
    case FETCH_NEW_POST.SUCCESS:
    case SAVE_POST.SUCCESS:
      return { ...state, postForm: {}, errorMessage: '' };
    
    case TOGGLE_POST.SUCCESS:
      const tempPost = { 
        ...state.posts[action.payload.sortRank], 
        accepted: action.payload.accepted, 
        status: action.payload.status 
      };
      const tempPosts = [...state.posts.slice(0, action.payload.sortRank), tempPost, ...state.posts.slice(action.payload.sortRank + 1)];
      return { ...state, posts: tempPosts };

    case FETCH_POSTS_INFINITELY.FAILURE:
      return { ...state, loading: false };

    case SAVE_POST.FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };
    
    default:
      return state;
  }
}