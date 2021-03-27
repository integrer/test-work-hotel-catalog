from argparse import ArgumentParser, Namespace, ArgumentDefaultsHelpFormatter
from typing import Callable, Tuple


def parse_args(define_args: Callable[[ArgumentParser], None]) -> Tuple[Namespace, Callable[[str], None]]:
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)

    define_args(parser)

    return parser.parse_args(), lambda err: parser.error(err)
