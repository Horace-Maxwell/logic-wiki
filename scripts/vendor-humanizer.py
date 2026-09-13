import urllib.request, json, pathlib, hashlib
root=pathlib.Path(__file__).resolve().parents[1]
lock=[]
for lang,repo in [('en','blader/humanizer'),('zh','holygeek00/humanizer-zh-cn')]:
    def fetch(url):
        return urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'LogicWiki-source-audit'}),timeout=40).read()
    commit=json.loads(fetch(f'https://api.github.com/repos/{repo}/commits/main'))['sha']
    files={}
    for name in ['SKILL.md','LICENSE']:
        data=fetch(f'https://raw.githubusercontent.com/{repo}/{commit}/{name}')
        (root/'vendor/humanizer'/lang/name).write_bytes(data)
        files[name]=hashlib.sha256(data).hexdigest()
    lock.append({'language':lang,'repository':f'https://github.com/{repo}','commit':commit,'files':files})
(root/'vendor/humanizer/lock.json').write_text(json.dumps(lock,indent=2)+'\n')
print(json.dumps(lock,indent=2))
