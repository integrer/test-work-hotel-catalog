from argparse import ArgumentParser, Namespace, ArgumentDefaultsHelpFormatter
from typing import Callable


def parse_args(define_args: Callable[[ArgumentParser], None], validate_args: Callable[[Namespace], None]) -> Namespace:
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)

    define_args(parser)

    args = parser.parse_args()

    try:
        validate_args(args)
    except ValueError as ex:
        parser.error(str(ex))

    return args
