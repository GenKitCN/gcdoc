from typing import Any
import json


desc_mapping = {}


def get_type(data: Any) -> str:
    if isinstance(data, int):
        return "Integer"
    if isinstance(data, str):
        return "String"
    if isinstance(data, bool):
        return "Boolean"
    if isinstance(data, dict):
        return "Object"
    else:
        return getattr(type(data), '__name__').title()


def sd2table(data: dict) -> str:  # single layer dict to markdown table
    table_txt = '\n| 配置键 | 类型 | 默认值 |\n| ------ | ---- | ------ |\n'
    table_txt += '\n'.join(f'| {i} | {get_type(data)} | {j} |' for i, j in data.items())
    return table_txt


def inner_pre(txt: str, offset: int = 0) -> str:
    padding = ' ' * offset
    return padding + f'\n{padding}'.join(
        txt.split('\n')
    )


def kv_showcase(key: str, value: Any, 
                title: str = "config.json", 
                ensure_ascii: bool = False, 
                indent: int = 4, **kwargs):
    kwargs.update(
        {
            "ensure_ascii": ensure_ascii,
            "indent": indent
        }
    )
    return f'```json title="{title}"\n' + json.dumps({key: value}, **kwargs) + '\n```'


def item2md(key: str, value: Any, title_lvl: int = 2, parent_key: str = None) -> str:
    block = '#' * title_lvl + f' `{key}`\n\n- 类型: `{get_type(value)}`\n\n'
    desc = desc_mapping.get(key)
    block += 'Descriptions here.' if not desc else desc
    block += '\n\n'
    if parent_key:
        block += kv_showcase(key=key, value=value, title='config.json $.{parent_key}.{key}')
    else:
        block += kv_showcase(key=key, value=value)
    if isinstance(value, dict):
        if type(dict) not in [type(n) for m, n in value.items()]:
            block += sd2table(value)
        else:
            block += obj2md(value, title_lvl=title_lvl + 1, parent_key=key)
    return block


if __name__ == '__main__':
    from argparse import ArgumentParser
    from time import strftime
    from pathlib import Path
    from os import PathLike

    
    def simple_logger(level: str, msg: str, color: int = None):
        level = level.upper()
        if not color:
            if level in ['WARN', 'WARNING', 'ATTENTION']:
                color = 31
            elif level in ['SUCCESS', 'DONE']:
                color = 32
            else:
                color = 37
        print(strftime(f'[\033[35m%Y-%m-%d %H:%M:%S\033[0m] [\033[{color}m{level}\033[0m]') + msg)
        

    simple_logger('INFO', 'Registering command parser...')
    parser = ArgumentParser()
    parser.add_argument('CONFIG', action='store', default='config.json', type=str, 
        help='path to Grasscutter config.')
    parser.add_argument('--desc', '-D', action='store', type=PathLike,
        help='path to description file which explain Grasscutter config keys.')
    parser.add_argument('--saveas', '-O', default='config.md', type=str,
        help='path for saving markdown file.')

    argv = parser.parse_args()
    if hasattr(argv, 'desc_mapping'):
        simple_logger('INFO', 'Trying to open the description file...')
        with open(Path(argv.desc_mapping), 'r', encoding='utf-8') as f:
            desc_ = json.load(f)
            desc_mapping.update(desc_)
    simple_logger('INFO', 'Reading config file...')
    conf_pth = Path(argv.CONFIG)
    with open(conf_pth, 'r', encoding='utf-8') as f:
        conf = json.load(f)
        simple_logger('SUCCESS', 'Successfully opened the configuration file from \n    ⨽' + str(conf_pth))
        md = '\n\n'.join(
            item2md(k, v) for k, v in conf.items()
        )
        with open(argv.saveas, 'w+', encoding='utf-8') as mdfile:
            mdfile.write(md)
        simple_logger('done', 'Writting done.')
