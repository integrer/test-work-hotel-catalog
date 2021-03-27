from os import path, environ
from functools import reduce
from typing import Dict, Optional, Set
from dotenv.main import dotenv_values


def get_envs(mode: str, location: str) -> Dict[str, Optional[str]]:
    test_dotenv_files = [f'.env.{mode}.local', f'.env.{mode}', '.env.local', '.env']
    paths = map(lambda file: path.join(location, file), test_dotenv_files)
    var_sets = [dotenv_values(f_path) for f_path in paths if path.isfile(f_path)]
    return reduce(lambda acc, cur: {**acc, **cur}, var_sets, {})


def apply_envs(envs: Dict[str, Optional[str]], override=False):
    for name, value in envs:
        if (override or name not in environ) and value is not None:
            environ[name] = value
