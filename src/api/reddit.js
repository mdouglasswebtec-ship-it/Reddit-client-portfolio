const BASE_URL = 'https://www.reddit.com'

// Helper: strips Reddit HTML entities and returns plain text/url
const cleanText = (str) => {
  if (!str) return ''
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

const apiFetch = async (url) => {
  const res = await fetch(url)
  if (res.status === 429) {
    throw new Error('Rate limited by Reddit. Please wait a moment and try again.')
  }
  if (!res.ok) {
    throw new Error(`Reddit API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

const mapPost = (child) => {
  const d = child.data
  return {
    id: d.id,
    title: cleanText(d.title),
    author: d.author,
    subreddit: d.subreddit,
    subreddit_name_prefixed: d.subreddit_name_prefixed,
    selftext: cleanText(d.selftext),
    url: d.url,
    permalink: d.permalink,
    thumbnail: d.thumbnail,
    preview: d.preview?.images?.[0]?.source?.url
      ? cleanText(d.preview.images[0].source.url)
      : null,
    is_video: d.is_video,
    media: d.media,
    score: d.score,
    num_comments: d.num_comments,
    created_utc: d.created_utc,
    link_flair_text: d.link_flair_text,
    post_hint: d.post_hint,
    is_self: d.is_self,
    upvote_ratio: d.upvote_ratio,
  }
}

const mapComment = (child, depth = 0) => {
  if (!child || child.kind === 'more') return null
  const d = child.data
  return {
    id: d.id,
    author: d.author,
    body: cleanText(d.body),
    score: d.score,
    created_utc: d.created_utc,
    depth,
    replies:
      d.replies && d.replies.data
        ? d.replies.data.children
            .map((c) => mapComment(c, depth + 1))
            .filter(Boolean)
        : [],
  }
}

export const fetchPosts = async (subreddit = 'popular', after = '') => {
  const url = `${BASE_URL}/r/${subreddit}.json?limit=25${after ? `&after=${after}` : ''}`
  const data = await apiFetch(url)
  return {
    posts: data.data.children.map(mapPost),
    after: data.data.after,
  }
}

export const fetchSearchResults = async (subreddit = 'all', query = '') => {
  const encoded = encodeURIComponent(query)
  const url =
    subreddit === 'all' || subreddit === 'popular'
      ? `${BASE_URL}/search.json?q=${encoded}&sort=relevance&limit=25`
      : `${BASE_URL}/r/${subreddit}/search.json?q=${encoded}&restrict_sr=1&sort=relevance&limit=25`
  const data = await apiFetch(url)
  return {
    posts: data.data.children.map(mapPost),
    after: data.data.after,
  }
}

export const fetchComments = async (subreddit, postId) => {
  const url = `${BASE_URL}/r/${subreddit}/comments/${postId}.json?limit=50`
  const data = await apiFetch(url)
  // data[1] contains the comments listing
  const comments = data[1].data.children
    .map((c) => mapComment(c))
    .filter(Boolean)
  return comments
}
