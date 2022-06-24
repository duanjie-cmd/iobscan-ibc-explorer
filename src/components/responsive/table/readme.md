## table
### iconAndTitle
> 表格内部组件。一个tablecell显示 icon和文字
- 接受参数
1. title 必须
2. subtitle 非必需
3. subtitleIsTag 非必需 表示是否以tag的形式展示
4. iconSize 非必需 small => 32px / normal（默认）=> 40px


### bottomStatus
> 表格底部状态说明
- 接受参数
1. type 必须 Channel / Relayer

- slot 名称
1. table_bottom_status


### index
> 表格组件
- 接受参数
1. columns 必须
2. data 必须
3. current 非必需
4. pageSize 非必需
5. 事件 @onPageChange
6. needCount 非必需 表示是否需要计数
7. needCustomColumns 必须 表示需要自定义tablecell的字段(例如`['name', 'age']`)

- 说明
1. 当current 和 pageSize都不传的时候，表示开启前端分页